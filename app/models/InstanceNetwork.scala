// scalastyle:off
package models

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json.{DefaultJsonProtocol, JsonFormat}

trait InstanceNetworkJsonSupport extends SprayJsonSupport with DefaultJsonProtocol with InstanceJsonSupport with InstanceLinkJsonSupport {
  implicit val InstanceNetworkFormat : JsonFormat[InstanceNetwork] = jsonFormat2(InstanceNetwork)
}

final case class InstanceNetwork (instances: List[Instance], links: List[InstanceLink])
