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
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { TableAllComponent } from './table-all.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';
import { LabelDeleteComponent } from '../label-delete/label-delete.component';
import { ApiService } from '../../api/api/api.service';
import { MaterialModule } from 'src/app/material-module/material.module';
import { ApiModule } from 'src/app/api/api.module';
import { JwtModule } from '@auth0/angular-jwt';
import { MatChipsModule } from '@angular/material/chips';

describe('TableAllComponent', () => {
  let component: TableAllComponent;
  let fixture: ComponentFixture<TableAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableAllComponent],
      imports: [HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule,
        MaterialModule, JwtModule.forRoot({}), ApiModule, MatChipsModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      },
      {
        provide: MatTableDataSource,
        useValue: {}
      }]
    })
      .compileComponents();

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AddDialogComponent, DeleteDialogComponent, LabelDialogComponent, LabelDeleteComponent],
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, async(inject([HttpTestingController, ApiService],
    (apiService: ApiService) => {
      expect(apiService).toBeTruthy();
    })));

  it('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('mat-form-field').length).toBe(1);
  });

});
