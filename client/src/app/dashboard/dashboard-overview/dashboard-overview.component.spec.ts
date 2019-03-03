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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StatusCardComponent } from '../status-card/status-card.component';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module/material.module';
import { InfoCenterComponent} from "../info-center/info-center.component";
import { GraphViewModule} from '../graph-view/graph-view.module';
import { DashboardOverviewComponent } from './dashboard-overview.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('DashboardOverviewComponent', () => {
  let component: DashboardOverviewComponent;
  let fixture: ComponentFixture<DashboardOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOverviewComponent, DashboardCardComponent, StatusCardComponent, InfoCenterComponent],
      imports: [RouterModule, HttpClientModule, RouterTestingModule, MaterialModule, GraphViewModule,NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 afterEach(() => {
        fixture.destroy();
    });



 /* it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
