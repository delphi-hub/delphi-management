/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package controllers

import akka.actor.{ActorRef, ActorSystem}
import javax.inject.Inject
import play.api.{Configuration, Logger}
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.{WSAuthScheme, WSClient}
import akka.stream.Materializer
import play.api.libs.streams.ActorFlow
import actors.{ClientSocketActor, PublishSocketMessageActor}
import play.api.mvc._
import scala.concurrent.{Future, ExecutionContext}
import authorization.{AuthProvider, AuthAction}
import play.api.libs.json.{Json, JsValue}


trait MyExecutionContext extends ExecutionContext

/**
  * Custom execution context. Used to prevent overflowing of the thread pool,
  * which should be used to handle client connections.
  *
  * @param system
  */
class MyExecutionContextImpl @Inject()(implicit system: ActorSystem)
  extends CustomExecutionContext(system, "my.executor") with MyExecutionContext

/**
  * Controller used to manage the requests regarding the instance registry.
  *
  * @param myExecutionContext
  * @param controllerComponents
  * @param ws
  */


class InstanceRegistryController @Inject()(implicit system: ActorSystem, mat: Materializer, myExecutionContext: MyExecutionContext,
                                           val controllerComponents: ControllerComponents,
                                           ws: WSClient, config: Configuration, authAction: AuthAction)
  extends BaseController {


  lazy val pubActor: Option[ActorRef] = Some(system.actorOf(PublishSocketMessageActor.props(instanceRegistryBasePath, mat, system), "publish-actor"))

  val instanceRegistryUri = config.get[String]("app.instanceRegistryUri")
  val instanceRegistryBasePath = config.get[String]("app.instanceRegistryBasePath")


  /** This method maps list of instances with specific componentType.
    *
    * @param componentType
    * @return
    */
  def instances(componentType: String): Action[AnyContent] = authAction.async {
    request =>
      ws.url(instanceRegistryUri).addQueryStringParameters("ComponentType" -> componentType)
        .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
        .get().map { response =>
        // TODO: possible handling of parsing the data can be done here

        Ok(response.body)
    }(myExecutionContext)
  }

  def socket: WebSocket = WebSocket.accept[String, String] {
    request => {
      ActorFlow.actorRef { out =>
        ClientSocketActor.props(out, pubActor.get)
      }
    }
  }

  /** This method lists all Users.
    * @return
    */

  def users(): Action[AnyContent] = authAction.async{
    request =>
      ws.url(instanceRegistryUri + "/users").withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
        .get().map { response =>
        if (response.status == 200) {
          Ok(response.body)
        } else {
          new Status(response.status)
        }
    }(myExecutionContext)
  }

  /** Called to fetch network graph of current registry. Contains a list of all instances and all links
    * currently registered.
    *
    * @return
    */

  def getNetwork(): Action[AnyContent] = authAction.async {
    request =>
      ws.url(instanceRegistryUri + "/instances/network").withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
        .get().map { response =>
        // TODO: possible handling of parsing the data can be done here
        Logger.debug(response.body)
        if (response.status == 200) {
          Ok(response.body)
        } else {
          new Status(response.status)
        }
    }(myExecutionContext)
  }

  /**
    * Fetches the number of instances for the specified ComponentType. The ComponentType is an optional parameter which is passed as an query
    * argument named 'ComponentType'
    *
    * @param componentType
    * @return
    */

  def numberOfInstances(componentType: String): Action[AnyContent] = authAction.async {
    // TODO: handle what should happen if the instance registry is not reachable.
    // TODO: create constants for the urls
    request =>
      ws.url(instanceRegistryUri + "/count").addQueryStringParameters("ComponentType" -> componentType)
        .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
        .get().map { response =>
        // TODO: possible handling of parsing the data can be done here
        if (response.status == 200) {
          Ok(response.body)
        } else {
          new Status(response.status)
        }
    }(myExecutionContext)
  }

  /**
    * This function is for handling all(start, stop, play, pause, resume) POST request.
    * To control the instance State (E.g. /instances/42/stop )
    *
    * @param componentId
    */


  def handleRequest(action: String, instanceID: String): Action[AnyContent] = authAction.async { request =>
    ws.url(instanceRegistryUri + "/instances/" + instanceID + action)
      .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
      .post("")
      .map { response =>
        new Status(response.status)
      }(myExecutionContext)
  }

  /**
    *  This method is called to assign a new instance to the instance with specified ID.
    * @param from
    * @param to
    * @return
    */

  def reconnect(from: Int, to: Int): Action[AnyContent] = authAction.async { request =>

    ws.url(instanceRegistryUri + "/instances/" + from + "/assignInstance"
    )
      .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
      .post(Json.obj("AssignedInstanceId" -> to))
      .map { response =>
        response.status match {
          case 200 =>
            Ok(response.body)
          case x =>
            new Status(x)
        }
      }(myExecutionContext)
  }

  /**
    * This function is for handling an POST request for adding an instance to the Scala web server
    * (E.g. .../instances/deploy
    *
    * @param componentType
    * @param name
    */

  def postInstance(compType: String, name: String): Action[AnyContent] = authAction.async {
    request =>
      ws.url(instanceRegistryUri + "/instances/deploy")
        .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
        .post(Json.obj("ComponentType" -> compType, "InstanceName" -> name))
        .map { response =>
          response.status match {
            // scalastyle:off magic.number
            case 202 =>
              // scalastyle:on magic.number
              Ok(response.body)
            case x: Any =>
              new Status(x)
          }
        }(myExecutionContext)
  }

  /**
    * This function sends JWT token and Username:Password encoded into the headers to Instance Registry
    * Instance registry returns a valid JWT token.
    *
    * @return
    */

  def authentication(): Action[AnyContent] = Action.async {
    request =>

      val jsonBody: Option[JsValue] = request.body.asJson

      jsonBody.map { json =>

        val username = (json \ "username").as[String]
        val password = (json \ "password").as[String]

        ws.url(instanceRegistryUri + "/users" + "/authenticate")
          .withAuth(username, password, WSAuthScheme.BASIC)
          .withHttpHeaders(("Delphi-Authorization", s"${AuthProvider.generateJwt()}"))
          .post("")
          .map { response =>
            if (response.status == 200) {
              Ok(response.body)
            } else {
              new Status(response.status)
            }
          }
      }.getOrElse{ Future(BadRequest("Invalid body"))}

    }

  /**
    * This function is used to add a label to specific instance.
    * @param instanceID ID of the instance on which label is to be added
    * @param label
    * @return
    */

  def labelInstance(instanceID: String, label: String): Action[AnyContent] = authAction.async
  {
    request =>
    ws.url(instanceRegistryUri + "/instances/" + instanceID + "/label")
      .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
      .post(Json.obj("Label" -> label))
      .map { response =>
        response.status match {
          // scalastyle:off magic.number
          case 202 =>
          // scalastyle:on magic.number
            Ok(response.body)
          case x: Any =>
            new Status(x)
        }
      }(myExecutionContext)
  }

  /**
    * This function is used to add a User.
    * Username, Secret and UserType are sent in the body post
    * Instance registry returns a valid userID
    * @return
    */

   def postUser(): Action[AnyContent] = authAction.async {
    request =>
      val jsonBody: Option[JsValue] = request.body.asJson
       jsonBody.map { json =>
        val userName = (json \ "userName").as[String]
        val secret = (json \ "secret").as[String]
        val userType = (json \ "userType").as[String]
        ws.url(instanceRegistryUri + "/users" + "/add")
        .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
        .post(json)
        .map { response =>
           if (response.status == 200) {
              Ok(response.body)
            } else {
              Logger.info(s"$ws")
              Logger.debug(s"$ws")
              new Status(response.status)
            }
        }
    }.getOrElse{ Future(BadRequest("Invalid body"))}
  }

/**
    * This function is used to delete a user.
    * @param userID ID of the user that is to be deleted
    * @return
    */
  def deleteUser( userID: String): Action[AnyContent] = authAction.async {
    request =>
    ws.url(instanceRegistryUri + "/users/" + userID + "/remove")
      .withHttpHeaders(("Authorization", s"Bearer ${request.token}"))
      .post("")
      .map { response =>
      response.status match {
          // scalastyle:off magic.number
          case 202 =>
          // scalastyle:on magic.number
            Ok(Json.obj("msg" -> response.body))
          case x: Any =>
            new Status(x)
        }
      }(myExecutionContext)
  }

}

