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

import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  DockerOperationError,
  EventType,
  EventTypeEnum,
  objectIsMessage,
  RegistryEvent
} from '../../model/models/socketMessage';
import {ComponentTypeEnum, Instance, objIsInstance} from '../../model/models/instance';
import {objIsLink, InstanceLinkPayload} from '../../model/models/instanceLink';


interface ObserverMap {
  [key: string]: Subject<ReturnType>;
}
type ReturnType = Instance | InstanceLinkPayload | number | DockerOperationError;

/**
 * The SocketService is used to create a socket connection to the web server.
 * It is possible for components to subscribe to events through the subscribeForEvent
 * method and send methods to the web server through the send method.
 * initSocket() has to be called in order to initiate the socket connection (if called
 * multiple times the same connection is returned).
 */
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  readonly wsUri: string;
  private socket: WebSocket;
  /**
   * This map is used to manage the observers interested in the defined events.
   * It maps event types to a set of observers interested in these events.
   */
  readonly observers: ObserverMap;

  constructor() {
    this.observers = {};
    this.wsUri = 'ws://' + location.host + '/ws';
    this.socket = null;
  }

  /**
   * Sends the given message to the web server. If the socket connection is not
   * open yet, but the socket connection has been created, an event listener
   * is registered and the message is send once the socket connection is open.
   * @param message
   */
  public send(message: {event: string}) {
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


  /**
   * Subscribes to the event of the given type. Returns an observable to subscribe
   * to in order to receive the corresponding updates.
   *
   * @param eventName
   */
  public subscribeForEvent<T extends ReturnType>(eventName: EventType): Observable<T> {

      /**
       * First step to subscribe for an event is to append the new observer to the set
       * or create a new set if there is no observer for the given event.
       */
      const registeredEvents = Object.keys(this.observers);

      let publishEventName: EventType = eventName;
      /**
       * Map all numbers changed event to global registry event
       */
      if (eventName === EventTypeEnum.InstanceNumbersCrawler ||
        eventName === EventTypeEnum.InstanceNumbersWebApp ||
        eventName === EventTypeEnum.InstanceNumbersWebApi) {

        publishEventName = EventTypeEnum.NumbersChangedEvent;
      }

      if (!registeredEvents.includes(eventName)) {
        this.observers[eventName] = new Subject<T>();
        console.log('registering for event', eventName);

        this.send({event: publishEventName});
      }

      return (this.observers[eventName].asObservable() as Observable<T>);
  }

  /**
   * Called when the socket receives a new message. Handles the forwarding
   * of the messages to the observers which are interested in it.
   * @param e
   */
  private socketOnMessage(e: MessageEvent) {

    const msg = this.parseSocketMsg(e);
    if (msg !== null) {
      const {event, toSend} = this.getEventAndPayload(msg);
      if (event !== null && toSend !== null) {
        const relevantSubject = this.observers[event];
        if (relevantSubject) {
          relevantSubject.next(toSend);
        }
      }
    }
  }

  /**
   * Parses the given message event @param e to a RegistryEvent.
   * If the given message is no RegistryEvent for any reason
   * (e.g. invalid json, or incorrectly structured json) the method
   * @returns null.
   */
  private parseSocketMsg(e: MessageEvent): RegistryEvent {
    try {
      const msg = JSON.parse(e.data);
      return objectIsMessage(msg) ? msg : null;
    } catch (err) {
      if (e.data !== EventTypeEnum.Heartbeat) {
        console.log('received message is no json', e.data, err);
      }
      return null;
    }
  }

  /**
   * Returns a tuple of event type and payload type. Here the matching of client events to
   * server events is done.
   * Example: NumbersChanged server event is mapped to three client events (WebappNumbersChanged,
   * CrawlerNumbersChanged, WebapiNumbersChanged)
   * @param msg
   */
  private getEventAndPayload(msg: RegistryEvent) {
    const event: EventType = msg.eventType;
    let result: {event: EventType, toSend: ReturnType};
    const payload: any = msg.payload;

    if (event === EventTypeEnum.NumbersChangedEvent) {
      result = this.getNumbersChangedPayload(payload);
    } else if (event === EventTypeEnum.LinkStateChangedEvent || event === EventTypeEnum.LinkAddedEvent) {
      result = {event, toSend: this.getLinkStatePayload(payload)};
    } else {
      result = {event, toSend: this.getInstanceFromPayload(payload)};
    }

    return result;
  }

  /**
   * Parses the given @param payload to an InstanceLinkPayload object. If the given payload is no
   * InstanceLinkPayload this method @eturns null;
   */
  private getLinkStatePayload(payload: any): InstanceLinkPayload {
    if (payload.instanceFrom !== undefined && payload.instanceTo !== undefined && payload.link !== undefined) {
      if (objIsInstance(payload.instanceFrom) && objIsInstance(payload.instanceTo) && objIsLink(payload.link)) {
        return payload;
      }
    }
    return null;
  }

  private getInstanceFromPayload(payload: any): ReturnType {
    if (objIsInstance(payload.instance)) {
      return payload.instance;
    }
    return null;
  }

  /**
   * In the instance registry only one numbers changed event exists. To handle this
   * event more easily it is split into three different event types for crawler, webapi,
   * and webapp on the client.
   * This method parses the given @param payload and returns an object containing the event
   * and the parsed payload.
   */
  private getNumbersChangedPayload(payload: any) {
    const toSend: ReturnType = payload.newNumber;
    let event: EventType = null;
    switch (payload.componentType) {
      case ComponentTypeEnum.WebApp:
        event = EventTypeEnum.InstanceNumbersWebApp;
        break;
      case ComponentTypeEnum.WebApi:
        event = EventTypeEnum.InstanceNumbersWebApi;
        break;
      case ComponentTypeEnum.Crawler:
        event = EventTypeEnum.InstanceNumbersCrawler;
        break;
    }

    return {event, toSend};
  }

  /**
   * Creates a new socket connection to the web server and returning
   * a promise. The promise resolves successfully once the connection
   * is open. If there already is a connection the promise resolves
   * instantly.
   * After opening the socket connection a heartbeat is send every
   * 5000ms to the server to keep the connection alive. The heartbeat
   * uses the setInterval() method.
   */
  public initSocket(): Promise<void> {
    if (this.socket === null) {

      this.socket = new WebSocket(this.wsUri);
      this.socket.addEventListener('message', (e: MessageEvent) => this.socketOnMessage(e));

      setInterval(() => {
        this.send({event: EventTypeEnum.Heartbeat});
      }, 5000);
      this.socket.addEventListener('close', () => {
        console.log('websocket was closed. Resetting socket to null');
        this.socket = null;
      });
      this.socket.addEventListener('error', () => {
        console.log('websocket had an error. Resetting socket to null');
        this.socket = null;
      });
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
