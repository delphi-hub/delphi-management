import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule, MatPaginatorModule, MatSort, MatSortModule, MatTableModule} from '@angular/material';

import { TableNotificationWebapiComponent } from './table-notification-webapi.component';
import {TableOverviewComponent} from "../table-overview/table-overview.component";
import {SocketService} from "../../api/api/socket.service";

describe('TableNotificationWebapiComponent', () => {
  let component: TableNotificationWebapiComponent;
  let fixture: ComponentFixture<TableNotificationWebapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNotificationWebapiComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
      ],
      providers: [
        TableOverviewComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNotificationWebapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should compile', () => {
    expect(component).toBeTruthy();
  });*/
});
