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






import {ComponentType, ComponentTypeEnum} from './instance';
import {InstanceLink, LinkStateEnum} from './instanceLink';

export interface RegistryEvent {
  /**
   * Valid types for events
   */
  eventType: EventType;
  payload: any;
}


  export type EventType = 'NumbersChangedEvent' | 'InstanceAddedEvent' | 'InstanceRemovedEvent' | 'StateChangedEvent' |
    'InstanceNumbersCrawler'| 'InstanceNumbersWebApi' | 'InstanceNumbersWebApp' | 'InstanceDetails' | 'Heartbeat';
  export const EventTypeEnum = {
    NumbersChangedEvent: 'NumbersChangedEvent' as EventType,
    InstanceAddedEvent: 'InstanceAddedEvent' as EventType,
    InstanceRemovedEvent: 'InstanceRemovedEvent' as EventType,
    StateChangedEvent: 'StateChangedEvent' as EventType,
    InstanceNumbersCrawler: 'InstanceNumbersCrawler' as EventType,
    InstanceNumbersWebApi: 'InstanceNumbersWebApi' as EventType,
    InstanceNumbersWebApp: 'InstanceNumbersWebApp' as EventType,
    InstanceDetails: 'InstanceDetails' as EventType,
    Heartbeat: 'Heartbeat' as EventType
  };


export interface NumbersChanged {
  componentType: ComponentType;
  newNumber: number;
}

export function payloadIsNumbersChanged(payload: any): payload is NumbersChanged {
  if (payload.componentType !== undefined && payload.newNumber !== undefined) {
    return payload.componentType in ComponentTypeEnum;
  }
}

export function payloadIsInstanceLink(payload: any): payload is InstanceLink {
  return payload.idFrom !== undefined &&
    payload.idTo !== undefined &&
    payload.linkState !== undefined && payload.linkState in LinkStateEnum;
}

export function objectIsMessage(obj: any): obj is RegistryEvent {
  return obj.eventType !== undefined && obj.payload !== undefined;
}
