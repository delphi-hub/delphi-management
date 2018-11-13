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
import akka.http.scaladsl.{Http, server}
import akka.http.scaladsl.model.ws.{Message, TextMessage, WebSocketRequest}
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future, Promise}
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.WSClient
import play.api.mvc._
import akka.stream.{Materializer, OverflowStrategy}
import akka.stream.scaladsl._
import controllers.PublishSocketMessageActor.AddOutActor
import models.{EventType, SocketMessage}
import play.api.libs.json.{Json, Reads, Writes}
import play.api.libs.streams.ActorFlow
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

  var pubActor: ActorRef = null

  def instances(componentType: String): Action[AnyContent] = Action.async {
    ws.url("http://localhost:8087/instances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
      // TODO: possible handling of parsing the data can be done here

      Ok(response.body)
    }(myExecutionContext)
  }

//  val (eventActor, eventPublisher) = Source.actorRef[Any](0, OverflowStrategy.dropNew).
//    toMat(Sink.asPublisher(fanout = true))(Keep.both).run()
    def socket: WebSocket = WebSocket.accept[SocketMessage, SocketMessage]{
      if(pubActor == null) {
        pubActor = system.actorOf(PublishSocketMessageActor.props, "publish-actor")
      }
      request => {
        ActorFlow.actorRef { out => 
          ClientSocketActor.props(out, pubActor)
        }
      }
    }
//  def socket: WebSocket = WebSocket.accept[SocketMessage, SocketMessage]{
//    request => { // Log events to the console
//
//
//      // using emit "one" and "two" and then keep the connection open
//      val flow: Flow[Message, Message, Promise[Option[Message]]] =
//        Flow.fromSinkAndSourceMat(
//          Sink.foreach[Message](println),
//          Source(List(TextMessage("one"), TextMessage("two")))
//            .concatMat(Source.maybe[Message])(Keep.right))(Keep.right)
//
//      val (upgradeResponse, promise) =
//        Http().singleWebSocketRequest(
//          WebSocketRequest("ws://localhost:8087/events"),
//          flow)
//
//      // at some later time we want to disconnect
////      promise.success(None)
//
//
//
//      val in = Sink.foreach[SocketMessage](println)
//      val msg = new SocketMessage(event=EventType.InstanceNumbersCrawler, payload = Option("wow so much information"))
//      val out = Source.single(msg).concat(Source.maybe)
//
//      Flow.fromSinkAndSource(in, out)
//    }
//  }

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
