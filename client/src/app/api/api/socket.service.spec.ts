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

import {TestBed} from '@angular/core/testing';

import {SocketService} from './socket.service';
import { doesNotReject } from 'assert';

describe('SocketService', () => {
  let socketService: SocketService;
  let socketMock;
  beforeEach(() => {
    function WebSocketStub(url: string) {
      socketMock = {
        url: url,
        readyState: WebSocket.OPEN,
        send: jasmine.createSpy('send'),
        close: jasmine.createSpy('close').and.callFake(function () {
          socketMock.readyState = WebSocket.CLOSING;
        })
      };

      return socketMock;
    }

    WebSocketStub['OPEN'] = WebSocket.OPEN;
    WebSocketStub['CLOSED'] = WebSocket.CLOSED;
      TestBed.configureTestingModule(
        {providers: [SocketService]});
    }
  );

  it('should be created', () => {
    socketService = TestBed.get(SocketService);
    expect(socketService).toBeTruthy();
  });

});
