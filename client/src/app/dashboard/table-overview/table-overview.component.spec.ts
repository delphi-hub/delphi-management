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

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableOverviewComponent } from './table-overview.component';
import { MaterialModule } from '../../material-module/material.module';
import { TableAllComponent } from '../table-all/table-all.component';
import { ModelService } from 'src/app/model/model.service';
import { MatSortModule } from '@angular/material';
import { InfoCenterComponent } from '../info-center/info-center.component';

describe('TableOverviewComponent', () => {
  let component: TableOverviewComponent;
  let fixture: ComponentFixture<TableOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOverviewComponent, TableAllComponent, InfoCenterComponent],
      imports: [HttpClientTestingModule, HttpClientModule, BrowserAnimationsModule, MatSortModule,
        MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, async(inject([HttpTestingController, ModelService],
    (modelService: ModelService) => {
      expect(modelService).toBeTruthy();
  })));
});
