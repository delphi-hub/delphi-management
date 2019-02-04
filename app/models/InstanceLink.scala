// scalastyle:off
package models

import LinkEnums.LinkState
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json.{DefaultJsonProtocol, DeserializationException, JsString, JsValue, JsonFormat}

trait InstanceLinkJsonSupport extends SprayJsonSupport with DefaultJsonProtocol {

  implicit val linkStateFormat: JsonFormat[LinkState] = new JsonFormat[LinkState] {
    override def read(value: JsValue): LinkState = value match {
      case JsString(s) => s match {
        case "Assigned" => LinkState.Assigned
        case "Outdated" => LinkState.Outdated
        case "Failed" => LinkState.Failed
        case x => throw DeserializationException(s"Unexpected string value $x for LinkState.")
      }
      case y => throw DeserializationException(s"Unexpected type $y during deserialization of LinkState")
    }

    override def write(linkState: LinkState): JsValue = JsString(linkState.toString)
  }

  implicit val instanceLinkFormat: JsonFormat[InstanceLink] =
    jsonFormat3(InstanceLink)
}


final case class InstanceLink(idFrom: Long, idTo:Long, linkState: LinkState)

object LinkEnums {
  type LinkState = LinkState.Value

  object LinkState extends Enumeration {
    val Assigned: Value =  Value("Assigned")
    val Failed: Value = Value("Failed")
    val Outdated: Value = Value("Outdated")
  }
}

