import {Component, ViewChild, Input, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {InfoCenterDataSource, InfoCenterItem } from './info-center-datasource';
import {SocketService} from '../../api/api/socket.service';
import { StoreService } from 'src/app/model/store.service';
import { EventService } from 'src/app/model/event.service';


@Component({
  selector: 'app-info-center',
  templateUrl: './info-center.component.html',
  styleUrls: ['./info-center.component.css']
})
export class InfoCenterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<InfoCenterItem>;
  @Input()compType: string;
  @Input()instanceId: string;
  dataSource: InfoCenterDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'notifName', 'dateTime', 'details'];

  constructor(private socketService: SocketService, private storeService: StoreService, private eventService: EventService) {}

  ngOnInit() {
    this.dataSource =
      new InfoCenterDataSource(this.storeService, this.socketService, this.paginator, this.sort,
        this.compType, this.instanceId, this.eventService);
  }

}
