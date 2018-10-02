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
import {Observable} from 'rxjs';
import {EventType, SocketMessage} from '../model/socketMessage';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private wsUri = 'ws://' + location.host + '/ws';
  protected basePath = '';
  public configuration = new Configuration();
  private socket: WebSocket = null;
  private registeredEvents: Set<EventType>;
  private observers = [];


  constructor(@Optional() @Inject(BASE_PATH) basePath: string,
              @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
    this.registeredEvents = new Set<EventType>();
  }

  public send(message: SocketMessage|EventType) {
    if (this.socket) {
      if (this.socket.readyState === this.socket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        this.socket.addEventListener('open', () => {
          this.socket.send(JSON.stringify(message));
        });
      }
    } else {
      throw new Error('trying to send data to a closed socket');
    }
  }

  public subscribeForUpdate(eventName: EventType): Observable<any> {
    console.log('creating observer for event type', eventName);

    return new Observable((observer) => {
      this.observers.push(observer);
      console.log('observerts: ', this.observers);
      if (!this.registeredEvents.has(eventName)) {
        this.registeredEvents.add(eventName);
        this.socket.send(eventName);
      }

      this.socket.onmessage = (e: MessageEvent) => {
        console.log('received on socket connection', e);
        // TODO: check e.data content before
        const msg: SocketMessage = JSON.parse(e.data);
        console.log('comparing msg event to event name', msg.event, eventName)
        if (msg.event.toString() === eventName.toString()) {
          this.observers.forEach(o => {o.next(e); });

        } else {
          console.log('drop event because it is not relevant');
        }
      };

      return () => {
        console.log('finished observable stream');
      };


    });
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
