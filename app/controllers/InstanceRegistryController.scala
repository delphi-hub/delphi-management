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

import akka.actor.ActorSystem
import javax.inject.Inject
import play.api.Configuration
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.json._
import play.api.libs.ws.WSClient
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}

import scala.concurrent.ExecutionContext


trait MyExecutionContext extends ExecutionContext

/**
  * Custom execution context. Used to prevent overflowing of the thread pool,
  * which should be used to handle client connections.
  *
  * @param system
  */
class MyExecutionContextImpl @Inject()(system: ActorSystem)
  extends CustomExecutionContext(system, "my.executor") with MyExecutionContext

/**
  * Controller used to manage the requests regarding the instance registry.
  *
  * @param myExecutionContext
  * @param controllerComponents
  * @param ws
  */
class InstanceRegistryController @Inject()(myExecutionContext: MyExecutionContext,
                                           val controllerComponents: ControllerComponents,
                                           ws: WSClient, config: Configuration)
  extends BaseController {


  val instanceRegistryUri = config.get[String]("app.instanceRegistryUri")

  def instances(componentType: String): Action[AnyContent] = Action.async {

    ws.url(instanceRegistryUri + "/instances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
      // TODO: possible handling of parsing the data can be done here

      Ok(response.body)
    }(myExecutionContext)
  }


  def numberOfInstances(componentType: String): Action[AnyContent] = Action.async {
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

  //This function is for POST method to the Scala web server


  def handleRequest(action: String): Action[AnyContent] = Action.async { request =>
    var instanceID = ""
    request.body.asJson.map { json =>
      for (jsonValue <- (json \ "params" \ "updates").as[JsValue].as[Seq[JsValue]]
      ) {
        val obj = jsonValue.as[JsObject]
        if ((obj \ "param").asOpt[String].get.equals("InstanceID")) {
          instanceID = (obj \ "value").asOpt[String].get.substring(1)
        }
      }
    }

    ws.url(instanceRegistryUri + action)
      .addQueryStringParameters("Id" -> instanceID)
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


  def postInstance(): Action[AnyContent] = Action.async { request =>
    var compType = ""
    var name = ""

    request.body.asJson.map { json =>
      for (jsonValue <- (json \ "params" \ "updates").as[JsValue].as[Seq[JsValue]]
      ) {
        val obj = jsonValue.as[JsObject]
        if ((obj \ "param").asOpt[String].get.equals("componentType")) {
          compType = (obj \ "value").asOpt[String].get
        } else if ((obj \ "param").asOpt[String].get.equals("name")) {
          name = (obj \ "value").asOpt[String].get
        }
      }

    }

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