import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectDialogComponent } from './connect-dialog.component';
import { MaterialModule } from 'src/app/material-module/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConnectDialogComponent', () => {
  let component: ConnectDialogComponent;
  let fixture: ComponentFixture<ConnectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectDialogComponent ],
      imports: [MaterialModule],
      providers: [ {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
