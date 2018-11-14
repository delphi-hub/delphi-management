package controllers
import akka.actor._
import controllers.PublishSocketMessageActor.{AddOutActor, PublishMessage, StopMessage}
import models.EventType.MessageType
import models.{ SocketMessage}

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

object PublishSocketMessageActor {
  def props:Props = Props[PublishSocketMessageActor]
  final case class AddOutActor(out: ActorRef, event: MessageType)
  final case class PublishMessage(msg: SocketMessage)
  final case class StopMessage(toStop: ActorRef)
}

class PublishSocketMessageActor() extends Actor {
  
  val eventActorMap: mutable.HashMap[MessageType, ListBuffer[ActorRef]] = new mutable.HashMap[MessageType, ListBuffer[ActorRef]]()
  
  //      val flow: Flow[Message, Message, Promise[Option[Message]]] =
//        Flow.fromSinkAndSourceMat(
//          Sink.foreach[Message](println),
//          Source(List(TextMessage("one"), TextMessage("two")))
//            .concatMat(Source.maybe[Message])(Keep.right))(Keep.right)


  override def preStart() {
    println("pre start called in publisher", self)
    //      val (upgradeResponse, promise) =
//        Http().singleWebSocketRequest(
//          WebSocketRequest("ws://localhost:8087/events"),
//          flow)
  }

  override def postStop() {
    println("post stop called in publisher", self)
    //      // at some later time we want to disconnect
////      promise.success(None)
  }
  
  def receive: PartialFunction[Any, Unit] = {
    
    case StopMessage(toStop) =>
      println("stop received", toStop)
      for ((k, v) <- eventActorMap) v -= toStop

    case AddOutActor(out, event) =>
      println("received add out actor", out)
      if (!eventActorMap.contains(event)){
        eventActorMap += (event -> new ListBuffer[ActorRef]())
      }
      eventActorMap(event) += out

    case PublishMessage(msg) =>
      println("publish message called with message", msg)
      if(eventActorMap.contains(msg.event)){

        val list = eventActorMap(msg.event)
        println("found list in actor map for msg", list)
        list.foreach((actor) => {
          println("sending message to actor", actor)
          actor ! PublishMessage(msg)
        })
      }
  }

}
