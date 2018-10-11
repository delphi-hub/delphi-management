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

import {Instance, objIsInstance} from './instance';

export enum EventType {
  InstanceNumbers = 'InstanceNumbers',
  InstanceDetails = 'InstanceDetails',
}

export interface SocketMessage {
  event: EventType;
  payload?: any;
}

export function messageHasPayload(msg: SocketMessage): msg is SocketMessage {
  return msg.payload !== undefined;
}

export function objectIsMessage(obj: any): obj is SocketMessage {
  return obj.event !== undefined;
}

/**
 * Verifies if the given message's payload matches the expected format
 * according to the given message's type.
 * @param msg
 */
export function checkMessageType(msg: SocketMessage) {
  let successfulTypeCheck = true;
  switch (msg.event) {
    case EventType.InstanceNumbers:
      successfulTypeCheck = payloadIsInstanceNumber(msg.payload);
      break;
    case EventType.InstanceDetails:
      successfulTypeCheck = objIsInstance(msg.payload);
      break;
  }

  if (!successfulTypeCheck) {
    throw new Error('Expected message type for message ' + msg + ' was not met.');
  }
}


export interface InstanceNumbers {
    kind: Instance.ComponentTypeEnum;
    amount: Number;
}

export function payloadIsInstanceNumber(payload: any): payload is InstanceNumbers {
  console.log('payload kind in enum', payload.kind in EventType);
  return ((payload.kind !== undefined && typeof payload.kind === 'string' && payload.kind in EventType)
    && (payload.amount !== undefined && typeof payload.amount === 'number'));
}
