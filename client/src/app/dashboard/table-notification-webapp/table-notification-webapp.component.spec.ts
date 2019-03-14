import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule, MatPaginatorModule, MatSort, MatSortModule, MatTableModule} from '@angular/material';

import { TableNotificationWebappComponent } from './table-notification-webapp.component';
import {TableOverviewComponent} from "../table-overview/table-overview.component";

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
        MatIconModule
      ],
      providers: [
        TableOverviewComponent,
        MatSort
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNotificationWebappComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
