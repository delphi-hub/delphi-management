import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DatatableNotificationDataSource} from './datatable-notification-datasource';


@Component({
  selector: 'app-datatable-notification',
  templateUrl: './datatable-notification.component.html',
  styleUrls: ['./datatable-notification.component.css']
})
export class DatatableNotificationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DatatableNotificationDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'notifName', 'dateTime', 'details'];

  ngOnInit() {
    this.dataSource = new DatatableNotificationDataSource(this.paginator, this.sort);
  }

  constructor(public dialog: MatDialog) {}

  // TODO dialog for display details
  openDialog(){}
}


