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
import {ComponentTypeEnum, Instance} from '../../model/models/instance';
import { ModelService } from 'src/app/model/model.service';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.css']
})
export class TableOverviewComponent implements OnInit {

  webapiData: Instance[];
  webappData: Instance[];
  crawlerData: Instance[];

  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.webapiData = [];
    this.webappData = [];
    this.crawlerData = [];

    this.modelService.getObservableForInstances().subscribe(() => {
      this.webapiData = this.modelService.getComponentsByType(ComponentTypeEnum.WebApi);
    });

    this.modelService.getObservableForInstances().subscribe(() => {
      this.webappData = this.modelService.getComponentsByType(ComponentTypeEnum.WebApp);
    });

    this.modelService.getObservableForInstances().subscribe(() => {
      this.crawlerData = this.modelService.getComponentsByType(ComponentTypeEnum.Crawler);
    });
  }

}
