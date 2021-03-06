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
import {SysInfo} from '../../model/models/sysInfo';
import {ApiService} from '../../api/api/api.service';

@Component({
  selector: 'app-statuscard',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css']
})

export class StatusCardComponent implements OnInit {

  sysInfo: SysInfo;

  constructor( private apiService: ApiService) {
    this.sysInfo = { hostName: 'no server connection',
                    javaVersion: 'no server connection',
                    platformName: 'no server connection',
                    scalaVersion: 'no server connection' };
  }

  ngOnInit() {
    this.apiService.getSysInfo().subscribe((sysInfo) => {
      this.sysInfo = sysInfo;
    });
  }

}
