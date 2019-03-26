package actors
import akka.actor._
import actors.PublishSocketMessageActor.{AddOutActor, PublishMessage}
import models.EventEnums.EventType
import models.{EventJsonSupport, SocketMessage}
import play.api.Logger
import spray.json._

import scala.collection.mutable.HashSet
import play.api.libs.json._
import play.api.libs.functional.syntax._

object SteamLogsActor {
  def props(out: ActorRef, publisher: ActorRef): Props = Props(new ClientSocketActor(out, publisher))
}

class SteamLogsActor(out: ActorRef, publisher: ActorRef) extends Actor with EventJsonSupport {

  val logEvents: HashSet[EventType] = HashSet.empty[EventType]

  implicit val messageReads: Reads[SocketMessage] = ((JsPath \ "logs").read[EventType] and
    (JsPath \ "payload").readNullable[String])(SocketMessage.apply _)
  implicit val messageWrites: Writes[SocketMessage] = Json.writes[SocketMessage]

  override def preStart() {
    Logger.debug("pre start called in client" + self)
    out ! "successfully registered"
  }

  def receive: PartialFunction[Any, Unit] = {
    case msg: String =>
      val json = Json.parse(msg)
      val result = json.validate[SocketMessage]
      result.fold(
        errors => {Logger.error("error parsing message to json" + msg + " with error " + errors)},
        socketMsg => {
          Logger.debug("successfully parsed socket message" + socketMsg)
        }
      )

    case SocketMessage(event, payload) =>
      Logger.debug("received socket message in client" + SocketMessage)
      if (!logEvents.contains(event)) {
        logEvents += event
        publisher ! AddOutActor(self, event)
      }

    case PublishMessage(msg) =>
      Logger.debug("received publish message in client" + self)
      out ! msg.toJson(eventFormat).toString()
  }

}
