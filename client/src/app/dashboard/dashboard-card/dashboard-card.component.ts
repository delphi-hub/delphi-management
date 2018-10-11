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

import {Component, Input, OnInit} from '@angular/core';
import {ApiService, Instance, SocketService} from '../../api';
import {EventType, InstanceNumbers} from '../../api/model/socketMessage';
import ComponentTypeEnum = Instance.ComponentTypeEnum;


@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})

/**
 * The dashboard-card component is used to provide
 * an overview of the status of the given component.
 * The needed information are queried based on the
 * given componentType.
 */
export class DashboardCardComponent implements OnInit {

  /**
   * Map used to dynamically decide which event type the component should register to.
   */
  static compTypeEventMap = {
    [ComponentTypeEnum.Crawler]: EventType.InstanceNumbersCrawler,
    [ComponentTypeEnum.WebApp]: EventType.InstanceNumbersWebApp,
    [ComponentTypeEnum.WebApi]: EventType.InstanceNumbersWebApi,
  };

  @Input() img: string;
  @Input() route: string;
  @Input() title: string;
  @Input() componentType: ComponentTypeEnum;

  numberOfInstances: string;
  numberOfFailedInstances: string;

  constructor(private irService: ApiService, private socketService: SocketService) {
    this.numberOfFailedInstances = 'No server connection';
   }

  ngOnInit() {
    // this has to be called onInit and not in the constructor, due
    // to the component lifecycle. Input's are not initialized in
    // the constructor.
    this.setInstanceNumber();
    this.socketService.initSocket().then(() => {

      const eventType: EventType = DashboardCardComponent.compTypeEventMap[this.componentType];

      this.socketService.subscribeForEvent(eventType).subscribe((data: InstanceNumbers) => {
        console.log('data callback in card component', data);
        if (data.kind !== this.componentType) {
          throw new Error('Received component type does not match dashboard cards component type ' + data);
        }

        this.numberOfInstances = '' + data.amount;
      });
    });

  }

  /**
   * Uses the instance service to query the number of instances in the current system.
   * If there is no server connection the value is set to a default error message.
   */
  private setInstanceNumber() {
    this.irService.getNumberOfInstances(this.componentType).subscribe((amount: number) => {
      this.numberOfInstances = '' + amount;
    }, () => {
      this.numberOfInstances = 'No server connection';
    });
  }

}
