import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddDialogComponent } from './add-dialog.component';


describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDialogComponent],
      imports: [ HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, MatIconModule,
       MatInputModule, MatDialogModule, FormsModule, MatFormFieldModule ],
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

    it('should check for confirm button inside the Add dialog', () => {
      component.onConfirmAddInstance();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });

  it('should check for button inside the Add dialog', () => {
    component.onCloseCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
