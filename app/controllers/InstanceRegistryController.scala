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

import akka.Done
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.model.ws.{Message, TextMessage, WebSocketRequest}
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.WSClient
import play.api.mvc._
import akka.stream.Materializer
import akka.stream.scaladsl._
import models.{EventType, SocketMessage}
import play.api.libs.json.{Json, Reads, Writes}
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


    implicit val messageReads: Reads[SocketMessage] = Json.reads[SocketMessage]
    implicit val messageWrites: Writes[SocketMessage] = Json.writes[SocketMessage]
    implicit val messageFlowTransformer: MessageFlowTransformer[SocketMessage, SocketMessage] =
      MessageFlowTransformer.jsonMessageFlowTransformer[SocketMessage, SocketMessage]


  def instances(componentType: String): Action[AnyContent] = Action.async {
    ws.url("http://localhost:8087/instances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
      // TODO: possible handling of parsing the data can be done here

      Ok(response.body)
    }(myExecutionContext)
  }

  def socket: WebSocket = WebSocket.accept[SocketMessage, SocketMessage]{
    request => { // Log events to the console
      val in = Sink.foreach[SocketMessage](println)


      // TODO: parse the response and send it to the client via socket connection
      // Future[Done] is the materialized value of Sink.foreach,
      // emitted when the stream completes
      val incoming: Sink[Message, Future[Done]] =
      Sink.foreach[Message] {
        case message: TextMessage.Strict =>
          println(message.text)
      }

      // TODO: check with infrastructure team what they expect to register for events
      val outgoing = Source.single(TextMessage("hello world!"))
      // TODO: figure out actual endpoint
      val webSocketFlow = Http().webSocketClientFlow(WebSocketRequest("ws://localhost:8087/events"))


      // TODO: scala akka magic as seen here https://doc.akka.io/docs/akka-http/current/client-side/websocket-support.html
      // the materialized value is a tuple with
      // upgradeResponse is a Future[WebSocketUpgradeResponse] that
      // completes or fails when the connection succeeds or fails
      // and closed is a Future[Done] with the stream completion from the incoming sink
      val (upgradeResponse, closed) =
      outgoing
        .viaMat(webSocketFlow)(Keep.right) // keep the materialized Future[WebSocketUpgradeResponse]
        .toMat(incoming)(Keep.both) // also keep the Future[Done]
        .run()

      // just like a regular http request we can access response status which is available via upgrade.response.status
      // status code 101 (Switching Protocols) indicates that server support WebSockets
      val connected = upgradeResponse.flatMap { upgrade =>
        if (upgrade.response.status == StatusCodes.SwitchingProtocols) {
          Future.successful(Done)
        } else {
          throw new RuntimeException(s"Connection failed: ${upgrade.response.status}")
        }
      }

      // in a real application you would not side effect here
      connected.onComplete(println)
      closed.foreach(_ => println("closed"))
      val msg = new SocketMessage(event=EventType.InstanceNumbersCrawler, payload = Option("wow so much information"))
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
