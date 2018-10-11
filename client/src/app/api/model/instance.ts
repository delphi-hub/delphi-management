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


export interface Instance {
    id?: number;
    host?: string;
    portNumber?: number;
    name?: string;
    /**
     * Component Type
     */
    componentType?: Instance.ComponentTypeEnum;
}

export function objIsInstance(obj: any): obj is Instance {
  return (obj.id !== undefined && typeof obj.id === 'number' &&
          obj.host !== undefined && typeof obj.host === 'string' &&
          obj.portNumber !== undefined && typeof obj.portNumber === 'number' &&
          obj.name !== undefined && typeof obj.name === 'string' &&
          obj.componentType !== undefined && obj.componentType in Instance.ComponentTypeEnum);
}

export namespace Instance {
    export type ComponentTypeEnum = 'Crawler' | 'WebApi' | 'WebApp' | 'DelphiManagement';
    export const ComponentTypeEnum = {
        Crawler: 'Crawler' as ComponentTypeEnum,
        WebApi: 'WebApi' as ComponentTypeEnum,
        WebApp: 'WebApp' as ComponentTypeEnum,
        DelphiManagement: 'DelphiManagement' as ComponentTypeEnum
    };
}
