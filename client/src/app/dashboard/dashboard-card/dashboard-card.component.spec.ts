/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { async, TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule, MatInputModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { CrawlerComponent } from '../crawler/crawler.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableAllComponent } from '../table-all/table-all.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService} from '../../api';
import { DashboardCardComponent } from './dashboard-card.component';
import { HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('component: DashboardCardComponent', () => {
  let location;
  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [ApiService],
      imports: [RouterTestingModule.withRoutes([
        { path: 'dashboard/crawler', component: CrawlerComponent}
      ]), HttpClientTestingModule, HttpClientModule, MatTableModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatIconModule],
      declarations: [ DashboardCardComponent, CrawlerComponent, DashboardComponent, TableAllComponent, HeaderComponent]
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));


  it(`should create`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {
      expect(apiService).toBeTruthy();
  })));
});

