/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package models

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._

/**
  * Currently, this class is copy pasted from the Delphi-Crawler and customized.
  * In future this will be generated from the swagger file.
  */

trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val componentTypeFormat = new JsonFormat[InstanceEnums.ComponentType] {
    def write(compType : InstanceEnums.ComponentType) = JsString(compType.toString())

    def read(value: JsValue) = value match {
      case JsString(s) => s match {
        case "Crawler" => InstanceEnums.ComponentType.Crawler
        case "WebApi" => InstanceEnums.ComponentType.WebApi
        case "WebApp" => InstanceEnums.ComponentType.WebApp
        case "DelphiManagement" => InstanceEnums.ComponentType.DelphiManagement
        case "ElasticSearch" => InstanceEnums.ComponentType.ElasticSearch
        case x => throw new RuntimeException(s"Unexpected string value $x for component type.")
      }
      case y => throw new RuntimeException(s"Unexpected type $y while deserializing component type.")
    }
  }
  implicit val instanceFormat = jsonFormat5(Instance)
}

final case class Instance (
                            ID: Option[Long],
                            host: Option[String],
                            portNumber: Option[Long],
                            name: Option[String],
                            /* Component Type */
                            componentType: Option[InstanceEnums.ComponentType]
                          )

object InstanceEnums {

  type ComponentType = ComponentType.Value
  object ComponentType extends Enumeration {
    val Crawler = Value("Crawler")
    val WebApi = Value("WebApi")
    val WebApp = Value("WebApp")
    val DelphiManagement = Value("DelphiManagement")
    val ElasticSearch = Value("ElasticSearch")
  }

}


