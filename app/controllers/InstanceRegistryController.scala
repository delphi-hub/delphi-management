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
import play.api.libs.json._
import play.api.libs.ws.WSClient
import akka.stream.Materializer
import play.api.libs.streams.ActorFlow
import actors.{ClientSocketActor, PublishSocketMessageActor}
import play.api.mvc._

import scala.concurrent.ExecutionContext


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
                                           ws: WSClient, config: Configuration)
  extends BaseController {


  lazy val pubActor: Option[ActorRef] = Some(system.actorOf(PublishSocketMessageActor.props(instanceRegistryBasePath, mat, system), "publish-actor"))

  val instanceRegistryUri = config.get[String]("app.instanceRegistryUri")
  val instanceRegistryBasePath = config.get[String]("app.instanceRegistryBasePath")
  
  def instances(componentType: String): Action[AnyContent] = Action.async {

    ws.url(instanceRegistryUri + "/instances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
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

  def getNetwork(): Action[AnyContent] = Action.async {
    ws.url(instanceRegistryUri + "/network").get().map { response =>
      // TODO: possible handling of parsing the data can be done here
      Logger.debug(response.body)
      if (response.status == 200) {
        Ok(response.body)
      } else {
        new Status(response.status)
      }
    }(myExecutionContext)
  }

  def numberOfInstances(componentType: String) : Action[AnyContent] = Action.async {
    // TODO: handle what should happen if the instance registry is not reachable.
    // TODO: create constants for the urls
    ws.url(instanceRegistryUri + "/numberOfInstances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
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
  * To control the instance State
  * @param componentId
  */


  def handleRequest(action: String, instanceID: String): Action[AnyContent] = Action.async { request =>
    ws.url(instanceRegistryUri + action)
      .addQueryStringParameters("Id" -> instanceID)
      .post("")
      .map { response =>
        new Status(response.status)
      }(myExecutionContext)
  }

  def reconnect(from: String, to: String): Action[AnyContent] = Action.async { request =>
    ws.url(instanceRegistryUri + "/instances/" + from + "/assignInstance"
    )
      .post("AssignedInstanceId" -> to)
      .map { response =>
        response.status match {
          case 202 =>
            Ok(response.body)
          case x =>
            new Status(x)
        }
      }(myExecutionContext)
  }
  /**
  * This function is for handling an POST request for adding an instance to the Scala web server
  *
  * @param componentType
  * @param name
  */
  def postInstance(compType: String, name: String): Action[AnyContent] = Action.async { request =>
    ws.url(instanceRegistryUri + "/deploy")
      .addQueryStringParameters("ComponentType" -> compType, "InstanceName" -> name)
      .post("")
      .map { response =>
        response.status match {
          case 202 =>
            Ok(response.body)
          case x =>
            new Status(x)
        }
      }(myExecutionContext)
  }

}
