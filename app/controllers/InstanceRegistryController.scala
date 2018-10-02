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

import scala.concurrent.ExecutionContext
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.WSClient
import play.api.mvc._
import akka.stream.Materializer
import akka.stream.scaladsl._
import models.{EventType, SocketMessage}
import play.api.libs.json.{Json}
import play.api.mvc.WebSocket.MessageFlowTransformer

trait MyExecutionContext extends ExecutionContext

/**
  * Custom execution context. Used to prevent overflowing of the thread pool,
  * which should be used to handle client connections.
  * @param system
  */
class MyExecutionContextImpl @Inject()(implicit system: ActorSystem)
  extends CustomExecutionContext(system, "my.executor") with MyExecutionContext

/**
  * Controller used to manage the requests regarding the instance registry.
  * @param myExecutionContext
  * @param controllerComponents
  * @param ws
  */


class InstanceRegistryController @Inject()(implicit system: ActorSystem, mat: Materializer, myExecutionContext: MyExecutionContext,
                                           val controllerComponents: ControllerComponents,
                                           ws: WSClient)
  extends BaseController {


    implicit val messageReads = Json.reads[SocketMessage]
    implicit val messageWrites = Json.writes[SocketMessage]
    implicit val messageFlowTransformer = MessageFlowTransformer.jsonMessageFlowTransformer[SocketMessage, SocketMessage]


  def instances(componentType: String): Action[AnyContent] = Action.async {
    ws.url("http://localhost:8087/instances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
      // TODO: possible handling of parsing the data can be done here

      Ok(response.body)
    }(myExecutionContext)
  }

  def socket: WebSocket = WebSocket.accept[SocketMessage, SocketMessage]{
    request => { // Log events to the console
      val in = Sink.foreach[SocketMessage](println)

      // Send a single 'Hello!' message and then leave the socket open
      val msg = new SocketMessage(event=EventType.InstanceNumbers, payload = Option("wow so much information"))
      val out = Source.single(msg).concat(Source.maybe)

      Flow.fromSinkAndSource(in, out)
    }
  }
  def numberOfInstances(componentType: String) : Action[AnyContent] = Action.async {
    // TODO: handle what should happen if the instance registry is not reachable.
    // TODO: create constants for the urls
    ws.url("http://localhost:8087/numberOfInstances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
      // TODO: possible handling of parsing the data can be done here
      if (response.status == 200) {
        Ok(response.body)
      } else {
        new Status(response.status)
      }
    }(myExecutionContext)
  }

}
