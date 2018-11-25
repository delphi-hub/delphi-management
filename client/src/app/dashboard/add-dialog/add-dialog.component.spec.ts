import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatInputModule } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DebugElement } from '@angular/core';
import { AddDialogComponent } from './add-dialog.component';
import { ApiService } from '../../api';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  let debugElement: DebugElement;
  
  //fixture.detectChanges();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDialogComponent],

      imports: [HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, MatIconModule, MatInputModule, MatDialogModule, FormsModule, MatFormFieldModule],
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

    }).compileComponents();

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AddDialogComponent],
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it(`should create`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {
      expect(apiService).toBeTruthy();
    })));

  /*it('should check for Add Dialog function call', async(() => {
    spyOn(component, 'onConfirmAddInstance');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
    expect(component.onConfirmAddInstance).toHaveBeenCalled();
    });
  }));*/

  /*it(`should create`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {
      const onConfirmAddInstance = spyOn(component, 'onConfirmAddInstance');
    fixture.debugElement.query(By.css('#buttonR')).triggerEventHandler('click', null);
    expect(onConfirmAddInstance).toHaveBeenCalled();
    })));*/

});
