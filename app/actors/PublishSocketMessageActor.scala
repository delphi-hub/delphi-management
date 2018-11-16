package actors
import akka.actor._
import akka.http.scaladsl.model.ws.TextMessage
import actors.PublishSocketMessageActor.{AddOutActor, PublishMessage, StopMessage}
import models.EventEnums.EventType
import models.{EventJsonSupport, RegistryEvent, SocketMessage}
import spray.json._

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

object PublishSocketMessageActor {
  def props:Props = Props[PublishSocketMessageActor]
  final case class AddOutActor(out: ActorRef, event: EventType)
  final case class PublishMessage(msg: RegistryEvent)
  final case class StopMessage(toStop: ActorRef)
}

class PublishSocketMessageActor() extends Actor with EventJsonSupport {
  
  val eventActorMap: mutable.HashMap[EventType, ListBuffer[ActorRef]] = new mutable.HashMap[EventType, ListBuffer[ActorRef]]()


  override def preStart() {
    println("pre start called in publisher", self)


  }

  override def postStop() {
    println("post stop called in publisher", self)
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


    case TextMessage.Strict(msg) =>
      println("received something ", msg)
      val registryEvent = msg.parseJson.convertTo[RegistryEvent](eventFormat)
      self ! PublishMessage(registryEvent)

    case PublishMessage(msg) =>
      println("publish message called with message", msg)
      if(eventActorMap.contains(msg.eventType)){

        val list = eventActorMap(msg.eventType)
        println("found list in actor map for msg", list)
        list.foreach((actor) => {
          println("sending message to actor", actor)
          actor ! PublishMessage(msg)
        })
      }
  }

}
