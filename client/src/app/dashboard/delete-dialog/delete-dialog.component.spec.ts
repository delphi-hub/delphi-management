import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { MatTableModule, MatInputModule, MatPaginatorModule} from '@angular/material';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule} from '@angular/material/dialog';
import { DebugElement } from '@angular/core';

import { DeleteDialogComponent } from './delete-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let debugElement: DebugElement;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogComponent ],
      imports: [BrowserModule, BrowserAnimationsModule, MatTableModule, MatInputModule, MatPaginatorModule,
         MatFormFieldModule, MatIconModule, MatDialogModule],
      providers: [{
      provide: MatDialogRef,
      useValue: mockDialogRef
      }, {
      provide: MAT_DIALOG_DATA,
      useValue: {} 
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Delete Dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should check for confirm button inside the Delete dialog', () => {
    component.onCloseConfirm();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should check for cancle button inside the Delete dialog', () => {
    component.onCloseCancle();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
