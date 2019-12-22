import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api/api/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserAddComponent } from './user-add.component';

describe('UserAddComponent', () => {
  let fixture: ComponentFixture<UserAddComponent>;
  let select: HTMLElement;
  let debugElement: DebugElement;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddComponent],
      imports: [ HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, MatIconModule,
       MatInputModule, MatDialogModule, FormsModule, MatFormFieldModule, MatSelectModule ],
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
  let component: UserAddComponent;
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
  });

  it(`should create`, async(inject([HttpTestingController, ApiService],
    (apiService: ApiService) => {
      expect(apiService).toBeTruthy();
    })));
});


