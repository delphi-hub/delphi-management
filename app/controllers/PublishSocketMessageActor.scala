package controllers
import akka.actor._
import controllers.PublishSocketMessageActor.{AddOutActor, PublishMessage}
import models.EventType.MessageType
import models.{ SocketMessage}

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

object PublishSocketMessageActor {
  def props:Props = Props[PublishSocketMessageActor]
  final case class AddOutActor(out: ActorRef, event: MessageType)
  final case class PublishMessage(msg: SocketMessage)
}

class PublishSocketMessageActor() extends Actor {
  val eventActorMap: mutable.HashMap[MessageType, ListBuffer[ActorRef]] = new mutable.HashMap[MessageType, ListBuffer[ActorRef]]()
  var counter = 1


  def receive: PartialFunction[Any, Unit] = {
    case SocketMessage =>
      println("received socket message", SocketMessage)
      println("from sender", sender())
    case AddOutActor(out, event) =>
      println("received add out actor", out)
      counter += 1
      if (!eventActorMap.contains(event)){
        eventActorMap += (event -> new ListBuffer[ActorRef]())
      }
      eventActorMap(event) += out
      self ! PublishMessage(SocketMessage(event= event, payload=Option("" + counter)))
      // out ! SocketMessage(event=EventType.InstanceNumbersCrawler, payload = Option("wow so much information" + counter))
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
