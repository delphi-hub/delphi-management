import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule, MatPaginatorModule, MatSort, MatSortModule, MatTableModule} from '@angular/material';
import { TableNotificationCrawlerComponent } from './table-notification-crawler.component';
import {TableOverviewComponent} from "../table-overview/table-overview.component";

describe('TableNotificationCrawlerComponent', () => {
  let component: TableNotificationCrawlerComponent;
  let fixture: ComponentFixture<TableNotificationCrawlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNotificationCrawlerComponent ],
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
    fixture = TestBed.createComponent(TableNotificationCrawlerComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
