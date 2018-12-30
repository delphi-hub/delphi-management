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
import {EventType, EventTypeEnum} from '../../model/models/socketMessage';
import {ComponentType, ComponentTypeEnum} from '../../model/models/instance';
import { ModelService } from 'src/app/model/model.service';


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
    [ComponentTypeEnum.Crawler]: EventTypeEnum.InstanceNumbersCrawler,
    [ComponentTypeEnum.WebApp]: EventTypeEnum.InstanceNumbersWebApp,
    [ComponentTypeEnum.WebApi]: EventTypeEnum.InstanceNumbersWebApi,
  };

  @Input() img: string;
  @Input() route: string;
  @Input() title: string;
  @Input() componentType: ComponentType;

  numberOfInstances: string;
  numberOfFailedInstances: string;

  constructor(private modelService: ModelService) {
    this.numberOfFailedInstances = 'No server connection';
   }

  ngOnInit() {
    this.modelService.getObservableForInstances().subscribe(() => {
      this.numberOfInstances = '' + this.modelService.getComponentsByType(this.componentType).length;
    }, (error: Error) => {
      console.log(error);
      this.numberOfInstances = 'No server connection';
    });
  }


}
