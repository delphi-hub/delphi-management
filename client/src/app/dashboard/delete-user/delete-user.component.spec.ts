import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../api/api/api.service';
import { DeleteUserComponent } from './delete-user.component';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserComponent],
      imports: [HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, MatTableModule,
        MatInputModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatDialogModule],
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
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create Delete user Component`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {
      expect(apiService).toBeTruthy();
    })));

  it('should check for confirm button inside the User Delete', () => {
    component.confirmDeleteUser();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should check for cancel button inside the User Delete', () => {
    component.cancelDeleteUser();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
