import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableNotificationWebappDataSource } from './table-notification-webapp-datasource';

@Component({
  selector: 'app-table-notification-webapp',
  templateUrl: './table-notification-webapp.component.html',
  styleUrls: ['./table-notification-webapp.component.css']
})
export class TableNotificationWebappComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableNotificationWebappDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TableNotificationWebappDataSource(this.paginator, this.sort);
  }
}
