import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableNotificationWebapiDataSource } from './table-notification-webapi-datasource';

@Component({
  selector: 'app-table-notification-webapi',
  templateUrl: './table-notification-webapi.component.html',
  styleUrls: ['./table-notification-webapi.component.css']
})
export class TableNotificationWebapiComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableNotificationWebapiDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TableNotificationWebapiDataSource(this.paginator, this.sort);
  }
}
