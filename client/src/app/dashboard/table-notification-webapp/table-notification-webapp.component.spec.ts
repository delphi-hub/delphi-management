import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { TableNotificationWebappComponent } from './table-notification-webapp.component';

describe('TableNotificationWebappComponent', () => {
  let component: TableNotificationWebappComponent;
  let fixture: ComponentFixture<TableNotificationWebappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNotificationWebappComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNotificationWebappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
