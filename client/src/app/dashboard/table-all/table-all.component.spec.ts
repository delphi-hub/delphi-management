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
import { BrowserModule, By} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { MatDialogModule} from '@angular/material/dialog';
import { TableAllComponent } from './table-all.component';
import { DebugElement } from '@angular/core';


describe('TableAllComponent', () => {
  let component: TableAllComponent;
  let fixture: ComponentFixture<TableAllComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAllComponent ],
      imports: [BrowserModule, BrowserAnimationsModule, MatTableModule, MatInputModule,
         MatFormFieldModule, MatCheckboxModule, MatIconModule, MatDialogModule],
      providers: [{
      provide: MatDialogRef,
      useValue: {}
      }, {
      provide: MAT_DIALOG_DATA,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
      },
      {
      provide: MatTableDataSource,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
  }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAllComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
