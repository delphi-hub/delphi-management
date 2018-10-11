import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DatatableNotifDataSource } from './datatable-notif-datasource';


@Component({
  selector: 'app-datatable-notif',
  templateUrl: './datatable-notif.component.html',
  styleUrls: ['./datatable-notif.component.css']
})
export class DatatableNotifComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DatatableNotifDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'notifName', 'dateTime', 'details'];

  ngOnInit() {
    this.dataSource = new DatatableNotifDataSource(this.paginator, this.sort);
  }
}
