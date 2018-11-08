package controllers
import akka.actor._
import controllers.ClientSocketActor.PublishMessageToClient
import controllers.PublishSocketMessageActor.{AddOutActor, PublishMessage}

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

object PublishSocketMessageActor {
  def props:Props = Props[PublishSocketMessageActor]
  final case class AddOutActor(out: ActorRef, event: String)
  final case class PublishMessage(msg: Any, event: String)
}

class PublishSocketMessageActor() extends Actor {
  val eventActorMap: mutable.HashMap[String, ListBuffer[ActorRef]] = new mutable.HashMap[String, ListBuffer[ActorRef]]()

  def receive: PartialFunction[Any, Unit] = {
    case AddOutActor(out, event) =>
      if (!eventActorMap.contains(event)){
        eventActorMap += (event -> new ListBuffer[ActorRef]())
      }
      eventActorMap(event) += out
    case PublishMessage(msg, event) =>
      if(eventActorMap.contains(event)){
        val list = eventActorMap(event)
        list.foreach((actor) => {
          actor ! PublishMessageToClient(msg)
        })
      }
  }

}
