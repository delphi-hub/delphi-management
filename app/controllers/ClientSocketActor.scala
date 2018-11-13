package controllers
import akka.actor._
import controllers.PublishSocketMessageActor.{ AddOutActor, StopMessage, PublishMessage}
import models.{EventType, SocketMessage}
import models.EventType.MessageType
import scala.collection.mutable.HashSet

object ClientSocketActor {
  def props(out: ActorRef, publisher: ActorRef): Props = Props(new ClientSocketActor(out, publisher))
}

class ClientSocketActor(out: ActorRef, publisher: ActorRef) extends Actor {

  val myEvents: HashSet[MessageType] = HashSet.empty[MessageType]

  override def preStart() {
    println("pre start called in client", self)
    // publisher ! AddOutActor(self, EventType.InstanceNumbersCrawler)
  }

  override def postStop() {
    println("post stop called in client", self)
    publisher ! StopMessage(self)
  }

  def receive: PartialFunction[Any, Unit] = {
    case msg: String =>
      println("here", msg)
    case SocketMessage(event, payload) =>
      println("received socket message in client", SocketMessage)
      if (!myEvents.contains(event)) {
        myEvents += event
        publisher ! AddOutActor(self, event)
      }

    case PublishMessage(msg) =>
      println("received publish message in client", self)
      out ! msg
  }

}
