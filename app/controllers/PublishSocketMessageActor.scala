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
          actor ! msg
          actor ! PublishMessage(msg)
        })
      }
  }

}
