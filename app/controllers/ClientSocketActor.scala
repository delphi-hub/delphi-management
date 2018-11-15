package controllers
import akka.actor._
import controllers.PublishSocketMessageActor.{AddOutActor, PublishMessage, StopMessage}
import models.EventEnums.EventType
import models.{EventJsonSupport, SocketMessage}
import spray.json._

import scala.collection.mutable.HashSet
import play.api.libs.json._
import play.api.libs.functional.syntax._

object ClientSocketActor {
  def props(out: ActorRef, publisher: ActorRef): Props = Props(new ClientSocketActor(out, publisher))
}

class ClientSocketActor(out: ActorRef, publisher: ActorRef) extends Actor with EventJsonSupport {

  val myEvents: HashSet[EventType] = HashSet.empty[EventType]

  implicit val messageReads: Reads[SocketMessage] = ((JsPath \ "event").read[EventType] and
  (JsPath \ "payload").readNullable[String])(SocketMessage.apply _)
  implicit val messageWrites: Writes[SocketMessage] = Json.writes[SocketMessage]

  override def preStart() {
    println("pre start called in client", self)
    out ! "successfully registered"
  }

  override def postStop() {
    println("post stop called in client", self)
    publisher ! StopMessage(self)
  }

  def receive: PartialFunction[Any, Unit] = {
    case msg: String =>
      val json = Json.parse(msg)
      val result = json.validate[SocketMessage]
      result.fold(
        errors => {println("error parsing message to json", msg)},
        socketMsg => {
          println("successfully parsed socket message", socketMsg)
          if (socketMsg.event == EventType.Heartbeat) {
            out ! "Heartbeat"
          } else {
            publisher ! AddOutActor(self, socketMsg.event)
          }
        }
      )
      
    case SocketMessage(event, payload) =>
      println("received socket message in client", SocketMessage)
      if (!myEvents.contains(event)) {
        myEvents += event
        publisher ! AddOutActor(self, event)
      }

    case PublishMessage(msg) =>
      println("received publish message in client", self)
      out ! msg.toJson(eventFormat).toString()
  }

}
