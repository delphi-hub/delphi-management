import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LabelDialogComponent } from './label-dialog.component';
import { ApiService } from '../../api/api/api.service';

describe('LabelDialogComponent', () => {
  let component: LabelDialogComponent;
  let fixture: ComponentFixture<LabelDialogComponent>;
  const mocklabelDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelDialogComponent],
      imports: [ HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, MatIconModule,
       MatInputModule, MatDialogModule, FormsModule, MatFormFieldModule ],
      providers: [{
        provide: MatDialogRef,
        useValue: mocklabelDialogRef
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should check for confirm button inside the Label dialog', () => {
      component.onConfirmAddLabel();
      expect(mocklabelDialogRef.close).toHaveBeenCalled();
    });

  it('should check for button inside the Label dialog', () => {
    component.onCloseCancelLabel();
    expect(mocklabelDialogRef.close).toHaveBeenCalled();
  });
});
