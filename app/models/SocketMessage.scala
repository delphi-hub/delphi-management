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

import models.EventType.MessageType
import play.api.libs.json.{ Reads, Writes}


final case class SocketMessage(event: MessageType, payload: Option[String])


  object EventType extends Enumeration {
    type MessageType = EventType.Value
    val InstanceNumbers = Value("InstanceNumbers")
    val InstanceDetails = Value("InstanceDetails")

    implicit val MessageTypeReads: Reads[MessageType] = Reads.enumNameReads(EventType)
    implicit val MessageTypeWrites: Writes[MessageType] = Writes.enumNameWrites
  }

