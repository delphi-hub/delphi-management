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

import {Inject, Injectable, Optional} from '@angular/core';
import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private wsUri = 'ws://' + location.host + '/ws';
  protected basePath = '';
  public configuration = new Configuration();
  private socket: WebSocket = null;

  constructor(@Optional() @Inject(BASE_PATH) basePath: string,
              @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  public send(message: string) {
    if (this.socket) {
      if (this.socket.readyState === this.socket.OPEN) {
        this.socket.send(message);
      } else {
        this.socket.addEventListener('open', () => {
          this.socket.send(message);
        });
      }
    } else {
      throw new Error('trying to send data to a closed socket');
    }
  }

  public initSocket(): Promise<void> {
    if (this.socket === null) {
      this.socket = new WebSocket(this.wsUri);
    }
    return new Promise<void>((resolve) => {
      if (this.socket.readyState === this.socket.OPEN) {
        resolve();
      } else {
        this.socket.addEventListener('open', () => {
          resolve();
        });
      }
    });
  }

}
