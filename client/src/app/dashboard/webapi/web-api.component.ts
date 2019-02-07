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

import {Component, OnInit} from '@angular/core';
import {ComponentTypeEnum, Instance} from '../../model/models/instance';
import { ModelService } from 'src/app/model/model.service';
import { ApiService } from 'src/app/api/api/api.service';


@Component({
  selector: 'app-web-api',
  templateUrl: './web-api.component.html',
  styleUrls: ['./web-api.component.css']
})

export class WebApiComponent implements OnInit {
  // this array is inserted into the table all component in the html code
  tableData: Instance[];

  constructor(private modelService: ModelService, private apiService: ApiService) { }

  ngOnInit() {
    this.tableData = [];

    this.modelService.getObservableForInstances().subscribe(() => {
      this.tableData = this.modelService.getComponentsByType(ComponentTypeEnum.WebApi);
    });

  }

}
