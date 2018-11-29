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
import { ApiService } from '../../api/api/api.service';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  let debugElement: DebugElement;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDialogComponent],

      imports: [HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, MatIconModule, MatInputModule, MatDialogModule, FormsModule, MatFormFieldModule],
      providers: [{
        provide: MatDialogRef,
        useValue: mockDialogRef
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {} 
      }]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it(`should create Add dialog Component`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {
      expect(apiService).toBeTruthy();
    })));

    it('should check for confirm button inside the Add dialog', () => {
      component.onConfirmAddInstance();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });

  it('should check for button inside the Add dialog', () => {
    component.onCloseCancle();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
