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


import {InstanceLink} from './instanceLink';

export type ComponentType= 'Crawler' | 'WebApi' | 'WebApp' | 'DelphiManagement' | 'ElasticSearch';
export const ComponentTypeEnum = {
  Crawler: 'Crawler' as ComponentType,
  WebApi: 'WebApi' as ComponentType,
  WebApp: 'WebApp' as ComponentType,
  ElasticSearch: 'ElasticSearch' as ComponentType,
  DelphiManagement: 'DelphiManagement' as ComponentType
};


export interface Instance {
  id?: number;
  host: string;
  portNumber: number;
  name: string;
  linksTo: Array<InstanceLink>;
  linksFrom: Array<InstanceLink>;
  /**
   * Component Type
   */
  componentType: ComponentType;
  dockerId?: string;
  /**
   * State of the instance
   */
  state?: StateEnum;
  labels?: Array<string>;
}

export type StateEnum = 'Running' | 'Failed' | 'Stopped' | 'Paused' | 'NotReachable';
export const StateEnum = {
  Running: 'Running' as StateEnum,
  Failed: 'Failed' as StateEnum,
  Stopped: 'Stopped' as StateEnum,
  Paused: 'Paused' as StateEnum,
  NotReachable: 'NotReachable' as StateEnum
};

export function objIsInstance(obj: any): obj is Instance {
    return (obj.host !== undefined && typeof obj.host === 'string' &&
            obj.portNumber !== undefined && typeof obj.portNumber === 'number' &&
            obj.name !== undefined && typeof obj.name === 'string' &&
            obj.componentType !== undefined && obj.linksFrom !== undefined && obj.linksTo !== undefined);
}


