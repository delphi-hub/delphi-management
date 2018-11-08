package controllers
import akka.actor._
import controllers.ClientSocketActor.PublishMessageToClient


object ClientSocketActor {
  def props(out: ActorRef, event: String): Props = Props(new ClientSocketActor(out, event))
  final case class PublishMessageToClient(msg: Any)
}

class ClientSocketActor(out: ActorRef, event: String) extends Actor {

  def receive: PartialFunction[Any, Unit] = {
    case PublishMessageToClient(msg) =>
      out ! msg
  }

}
