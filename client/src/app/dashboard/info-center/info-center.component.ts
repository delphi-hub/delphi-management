import {Component, OnInit, ViewChild, OnDestroy, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {InfoCenterDataSource } from './info-center-datasource';
import {SocketService} from '../../api/api/socket.service';
import { StoreService } from 'src/app/model/store.service';


@Component({
  selector: 'app-info-center',
  templateUrl: './info-center.component.html',
  styleUrls: ['./info-center.component.css']
})
export class InfoCenterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input()compType: string;
  @Input()instanceId: string;
  dataSource: InfoCenterDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'notifName', 'dateTime', 'details'];

  constructor(private socketService: SocketService, private storeService: StoreService) {}

  ngOnInit() {
    this.dataSource =
      new InfoCenterDataSource(this.storeService, this.socketService, this.paginator, this.sort, this.compType, this.instanceId);
  }

}
