import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { InfoCenterDataSource } from './info-center-datasource';
import {SocketService} from "../../api/api/socket.service";
import {DatePipe} from "@angular/common";
import {EventTypeEnum} from "../../model/models/socketMessage";
import {Instance} from "../../model/models/instance";

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

  constructor(private socketService: SocketService, private changeDetectorRefs: ChangeDetectorRef){}

  ngOnInit() {
    this.dataSource = new InfoCenterDataSource(this.paginator, this.sort);
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      var datePipe = new DatePipe("en-US");
      var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
      let line = {instanceId: newInstance.id, type: 'add_circle', notifName: 'new Instance added', dateTime: actualDate, details: 'Instance Name: '+newInstance.name};
      this.dataSource.add(line);
      this.changeDetectorRefs.detectChanges();
      this.paginator.lastPage();
      this.paginator.firstPage();
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).subscribe((removeInstance: Instance) => {
      var datePipe = new DatePipe("en-US");
      var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
      let line = {instanceId: removeInstance.id, type: 'delete_sweep', notifName: 'Instance removed', dateTime: actualDate, details: 'Instance Name: '+removeInstance.name};
      this.dataSource.add(line);
      this.changeDetectorRefs.detectChanges();
      this.paginator.lastPage();
      this.paginator.firstPage();
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.LinkStateChangedEvent).subscribe((changeInstance: Instance) => {
      var datePipe = new DatePipe("en-US");
      var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
      let line = {instanceId: changeInstance.id, type: 'link', notifName: 'Instance changed', dateTime: actualDate, details: changeInstance.name};
      this.dataSource.add(line);
      this.changeDetectorRefs.detectChanges();
      this.paginator.lastPage();
      this.paginator.firstPage();
    });
  }
}
