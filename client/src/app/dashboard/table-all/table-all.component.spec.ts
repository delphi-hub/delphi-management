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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { MatTableModule, MatInputModule, MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { TableAllComponent } from './table-all.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DebugElement } from '@angular/core';
import { ApiService } from '../../api';


describe('TableAllComponent', () => {
  let component: TableAllComponent;
  let fixture: ComponentFixture<TableAllComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableAllComponent],
      imports: [HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, MatTableModule, MatInputModule, MatPaginatorModule,
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

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AddDialogComponent, DeleteDialogComponent],
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAllComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`should create`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {
      expect(apiService).toBeTruthy();
    })));

  it('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    const input = debugElement.query(By.css('#filter_data'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
  });

  it('should check for Add Dialog open functionality', async(() => {
    const openAddDialog = spyOn(component, 'openAddDialog');
    fixture.debugElement.query(By.css('#addButton')).triggerEventHandler('click', null);
    expect(openAddDialog).toHaveBeenCalled();
  }));

 /* it('should check for Delete Dialog open functionality', async(() => {
    const openDeleteDialog = spyOn(component, 'openDeleteDialog');
    fixture.detectChanges(); 
    let el = fixture.debugElement.query(By.css('#deleteButton'))
    el.triggerEventHandler('click', null)

    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(component.openDeleteDialog).toHaveBeenCalled();
  });
  }));*/
});
