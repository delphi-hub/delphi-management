/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {InjectionToken} from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('basePath');
export const INSTANCES = '/api/instances';
export const INSTANCE_NETWORK = 'api/network';
export const SYS_INFO = '/api/systemInfo';
export const NUMBER_OF_INSTANCES = '/api/numberOfInstances';
export const NEW_INSTANCE = 'api/postInstance';
export const START_INSTANCE = 'api/startInstance';
export const STOP_INSTANCE = 'api/stopInstance';
export const PAUSE_INSTANCE = 'api/pauseInstance';
export const RESUME_INSTANCE = 'api/resumeInstance';
export const DELETE_INSTANCE = 'api/deleteInstance';
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
