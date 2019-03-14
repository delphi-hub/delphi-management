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

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ComponentTypeEnum, Instance} from '../../model/models/instance';
import { ModelService } from 'src/app/model/model.service';
import {EventTypeEnum} from "../../model/models/socketMessage";
import { DatePipe } from '@angular/common';
import {SocketService} from "../../api/api/socket.service";



@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.css']
})
export class TableOverviewComponent implements OnInit {
    webapiDetails: Instance[];
    webappDetails: Instance[];
    crawlerDetails: Instance[];
    webAppEvents = [];
    webAppEventsNumbers = 0;

    webApiEvents = [];
    webApiEventsNumbers = 0;

    crawlerEvents = [];
    crawlerEventsNumbers = 0;

constructor(private modelService: ModelService, private socketService: SocketService, private changeDetectorRefs: ChangeDetectorRef) {
  }
  ngOnInit() {
    /** * Function for getting all the instances of component type 'WebApi' using ModelService
   * @param ComponentType */
    this.modelService.getObservableForInstances().subscribe(() => {
      this.webapiDetails = this.modelService.getComponentsByType(ComponentTypeEnum.WebApi);
    });

    /** * Function for getting all the instances of component type 'WebApplication' using ModelService
   * @param ComponentType */
    this.modelService.getObservableForInstances().subscribe(() => {
      this.webappDetails = this.modelService.getComponentsByType(ComponentTypeEnum.WebApp);
    });

    /** * Function for getting all the instances of component type 'Crawler' using ModelService
   * @param ComponentType */
    this.modelService.getObservableForInstances().subscribe(() => {
      this.crawlerDetails = this.modelService.getComponentsByType(ComponentTypeEnum.Crawler);
    });

    /**
     * Get Events by component type
     */
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      if (newInstance.componentType=='WebApp'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: newInstance.id, type: 'add_circle', notifName: 'new Instance added', dateTime: actualDate, details: 'Instance Name: '+newInstance.name};
        this.webAppEvents.push(line);
        this.webAppEventsNumbers = this.webAppEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).subscribe((removeInstance: Instance) => {
      if (removeInstance.componentType=='WebApp'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: removeInstance.id, type: 'delete_sweep', notifName: 'Instance removed', dateTime: actualDate, details: removeInstance.name};
        this.webAppEvents.push(line);
        this.webAppEventsNumbers = this.webAppEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.LinkStateChangedEvent).subscribe((changeInstance: Instance) => {
      if (changeInstance.componentType=='WebApp'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: changeInstance.id, type: 'link', notifName: 'Instance changed', dateTime: actualDate, details:'Instance Name: '+ changeInstance.name};
        this.webAppEvents.push(line);
        this.webAppEventsNumbers = this.webAppEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });


    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      if (newInstance.componentType=='WebApi'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: newInstance.id, type: 'add_circle', notifName: 'new Instance added', dateTime: actualDate, details:'Instance Name: '+ newInstance.name};
        this.webApiEvents.push(line);
        this.webApiEventsNumbers = this.webApiEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).subscribe((removeInstance: Instance) => {
      if (removeInstance.componentType=='WebApi'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: removeInstance.id, type: 'delete_sweep', notifName: 'Instance removed', dateTime: actualDate, details: removeInstance.name};
        this.webApiEvents.push(line);
        this.webApiEventsNumbers = this.webApiEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.LinkStateChangedEvent).subscribe((changeInstance: Instance) => {
      if (changeInstance.componentType=='WebApi'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: changeInstance.id, type: 'link', notifName: 'Instance changed', dateTime: actualDate, details: 'Instance Name: '+changeInstance.name};
        this.webApiEvents.push(line);
        this.webApiEventsNumbers = this.webApiEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });

    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      if (newInstance.componentType=='Crawler'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: newInstance.id, type: 'add_circle', notifName: 'new Instance added', dateTime: actualDate, details:'Instance Name: '+ newInstance.name};
        this.crawlerEvents.push(line);
        this.crawlerEventsNumbers = this.crawlerEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).subscribe((removeInstance: Instance) => {
      if (removeInstance.componentType=='Crawler'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: removeInstance.id, type: 'delete_sweep', notifName: 'Instance removed', dateTime: actualDate, details: removeInstance.name};
        this.crawlerEvents.push(line);
        this.crawlerEventsNumbers = this.crawlerEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.LinkStateChangedEvent).subscribe((changeInstance: Instance) => {
      if (changeInstance.componentType=='Crawler'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: changeInstance.id, type: 'link', notifName: 'Instance changed', dateTime: actualDate, details: changeInstance.name};
        this.crawlerEvents.push(line);
        this.crawlerEventsNumbers = this.crawlerEvents.length;
        this.changeDetectorRefs.detectChanges();
      }
    });

  }

}
