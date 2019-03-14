import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {InfoCenterDataSource } from './info-center-datasource';
import {SocketService} from '../../api/api/socket.service';


@Component({
  selector: 'app-info-center',
  templateUrl: './info-center.component.html',
  styleUrls: ['./info-center.component.css']
})
export class InfoCenterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: InfoCenterDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'notifName', 'dateTime', 'details'];

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.dataSource = new InfoCenterDataSource(this.socketService, this.paginator, this.sort);
  }

}
