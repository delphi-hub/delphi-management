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
import {ApiService, Instance} from '../../api';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css']
})
export class CrawlerComponent implements OnInit {

  // this array is inserted into the table all component in the html code
  table_data: Instance[];
  compType: string;

  constructor(private apiService: ApiService) {
    this.compType = Instance.ComponentTypeEnum.Crawler;
  }

  ngOnInit() {

  this.table_data = [];

    /*this.table_data  = [
  {id:1, name: 'test1', host: 'host1' , portNumber: 1},
  {id:2, name: 'test2', host: 'host1' , portNumber: 2},
  {id:3, name: 'test3', host: 'host1' , portNumber: 3},
  {id:4, name:
   'test1', host: 'host1' , portNumber: 4}
];*/

    this.apiService.getInstances(Instance.ComponentTypeEnum.Crawler).subscribe((result: Array<Instance>) => {
      this.table_data = result;
    }, err => {
      console.log('error receiving data for crawler');
    });
  }

}

