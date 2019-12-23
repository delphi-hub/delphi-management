import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ApiService } from '../../api/api/api.service';
import { MaterialModule } from 'src/app/material-module/material.module';
import { UserManagementComponent } from './user-management.component';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementComponent],
      imports: [HttpClientTestingModule, HttpClientModule, BrowserModule, BrowserAnimationsModule,
        MaterialModule],
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
        entryComponents: [AddDialogComponent, DeleteDialogComponent],
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
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
    expect(fixture.nativeElement.querySelectorAll('mat-form-field').length).toBe(2);
  });

  it('should check for Add Dialog open functionality', async(() => {
    const openAddDialog = spyOn(component, 'openAddUser');
    fixture.debugElement.query(By.css('#addUser')).triggerEventHandler('click', null);
    expect(openAddDialog).toHaveBeenCalled();
  }));
});




