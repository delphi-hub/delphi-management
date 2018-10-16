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

import { Component, OnInit } from '@angular/core';
import {Instance} from '../../api';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

  showNotifCrawler = false;
  showNotifWebapi = false;
  showNotifWebapp = false;

  constructor() { }

  crawler = Instance.ComponentTypeEnum.Crawler;
  webApi = Instance.ComponentTypeEnum.WebApi;
  webApp = Instance.ComponentTypeEnum.WebApp;

  ngOnInit() {
  }


  public receivedNotifCrawler(event: boolean){
    this.showNotifCrawler = event;
  }

  public receivedNotifWebapp(event: boolean){
    this.showNotifWebapp = event;
  }

  public receivedNotifWebapi(event: boolean){
    this.showNotifWebapi = event;
  }


}
