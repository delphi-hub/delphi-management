import {Component, ViewChild, Input, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {InfoCenterDataSource, InfoCenterItem } from './info-center-datasource';
import { StoreService } from 'src/app/model/store.service';
import { EventService } from 'src/app/model/event.service';


@Component({
  selector: 'app-info-center',
  templateUrl: './info-center.component.html',
  styleUrls: ['./info-center.component.css']
})
export class InfoCenterComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<InfoCenterItem>;
  @Input()compType: string;
  @Input()instanceId: string;
  dataSource: InfoCenterDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'notifName', 'dateTime', 'details'];

  constructor(private storeService: StoreService, private eventService: EventService) {}

  ngOnInit() {
    this.dataSource =
      new InfoCenterDataSource(this.storeService, this.paginator, this.sort,
        this.compType, this.instanceId, this.eventService);
  }

}
