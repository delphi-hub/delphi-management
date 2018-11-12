package controllers
import akka.actor._
import controllers.ClientSocketActor.PublishMessageToClient
import controllers.PublishSocketMessageActor.AddOutActor
import models.{EventType, SocketMessage}


object ClientSocketActor {
  def props(out: ActorRef, event: String, publisher: ActorRef): Props = Props(new ClientSocketActor(out, event, publisher))
  final case class PublishMessageToClient(msg: Any)
}

class ClientSocketActor(out: ActorRef, event: String, publisher: ActorRef) extends Actor {


  override def preStart() {
    println("pre start called")
    println("publisher", publisher)
    publisher ! AddOutActor(self, EventType.InstanceNumbersCrawler)
    out ! SocketMessage(event=EventType.InstanceNumbersCrawler, payload=Option("test"))
  }

  override def postStop() {
    println("post stop called in client")
    //TODO: send a stop method to publisher
    // publisher ! StopMessage(self)
  }

  def receive: PartialFunction[Any, Unit] = {
    case SocketMessage =>
      println("received socket message", SocketMessage)
      publisher ! SocketMessage
    case PublishMessageToClient(msg) =>
      println("received publish message")
      out ! msg
  }

}
