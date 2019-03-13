import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableNotificationCrawlerDataSource } from './table-notification-crawler-datasource';

@Component({
  selector: 'app-table-notification-crawler',
  templateUrl: './table-notification-crawler.component.html',
  styleUrls: ['./table-notification-crawler.component.css']
})
export class TableNotificationCrawlerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableNotificationCrawlerDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TableNotificationCrawlerDataSource(this.paginator, this.sort);
  }
}
