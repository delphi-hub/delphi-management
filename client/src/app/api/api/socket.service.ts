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
import {Observable, Observer} from 'rxjs';
import {EventType, SocketMessage} from '../model/socketMessage';



interface ObserverMap {
  [key: string]: Set<Observer<any>>;
}

@Injectable({
  providedIn: 'root'
})

/**
 * The SocketService is used to create a socket connection to the web server.
 * It is possible for components to subscribe to events through the subscribeForEvent
 * method and send methods to the web server through the send method.
 * initSocket() has to be called in order to initiate the socket connection (if called
 * multiple times the same connection is returned).
 */
export class SocketService {

  private wsUri = 'ws://' + location.host + '/ws';
  protected basePath = '';
  public configuration = new Configuration();
  private socket: WebSocket = null;
  /**
   * This map is used to manage the observers interested in the defined events.
   * It maps event types to a set of observers interested in these events.
   */
  private observers: ObserverMap = {};

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

  /**
   * Sends the given message to the web server. If the socket connection is not
   * open yet, but the socket connection has been created, an event listener
   * is registered and the message is send once the socket connection is open.
   * @param message
   */
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

  // TODO: define an abstract data type to give the observable instead of any
  /**
   * Subscribes to the event of the given type. Returns an observable to subscribe
   * to in order to receive the corresponding updates.
   * @param eventName
   */
  public subscribeForEvent(eventName: EventType): Observable<any> {
    console.log('creating observer for event type', eventName);

    return new Observable((observer: Observer<any>) => {

      /**
       * First step to subscribe for an event is to append the new observer to the set
       * or create a new set if there is no observer for the given event.
       */
      const registeredEvents = Object.keys(this.observers);

      console.log('observers: ', this.observers);
      if (!registeredEvents.includes(eventName)) {
        this.observers[eventName] = new Set<Observer<any>>();
        this.socket.send(eventName);
      }
      this.observers[eventName].add(observer);

      this.socket.onmessage = (e: MessageEvent) => this.socketOnMessage(e);

      return () => {
        console.log('finished observable stream');
        const events = Object.keys(this.observers);
        events.forEach((event) => {
          // TODO: if observer list empty delete list
          this.observers[event].delete(observer);
        });
      };


    });
  }

  /**
   * Called when the socket receives a new message. Handles the forwarding
   * of the messages to the observers which are interested in it.
   * @param e
   */
  private socketOnMessage(e: MessageEvent) {
    console.log('received on socket connection', e);
    // TODO: check e.data content before
    const msg: SocketMessage = JSON.parse(e.data);
    const relevantObservers: Set<Observer<any>> = this.observers[msg.event];
    if (relevantObservers) {
      if (relevantObservers.size !== 0) {
        relevantObservers.forEach((obs) => {
          // TODO: cast payload depending on msg event type
          obs.next(msg.payload);
        });
      }
    }
  }

  /**
   * Creates a new socket connection to the web server and returning
   * a promise. The promise resolves successfully once the connection
   * is open. If there already is a connection the promise resolves
   * instantly.
   */
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
