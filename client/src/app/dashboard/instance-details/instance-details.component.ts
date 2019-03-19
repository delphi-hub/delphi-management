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
import { StoreService } from 'src/app/model/store.service';
import { Instance } from 'src/app/model/models/instance';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-instance-details',
  templateUrl: './instance-details.component.html',
  styleUrls: ['./instance-details.component.css']
})
export class InstanceDetailsComponent implements OnInit {

  instance: Instance;
  instanceId: string;

  constructor(private storeService: StoreService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const instanceId = params['instanceId'];
      if (instanceId) {
        const instance = this.storeService.getState().instances[+instanceId];
        if (instance) {
          this.instanceId = instanceId;
          this.instance = instance;
        }
      }
    });

  }
}
