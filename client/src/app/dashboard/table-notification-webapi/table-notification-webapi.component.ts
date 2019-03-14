import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {TableNotificationWebapiDataSource} from './table-notification-webapi-datasource';
import {SocketService} from "../../api/api/socket.service";
import {TableOverviewComponent} from "../table-overview/table-overview.component";
import {Instance} from "../../model/models/instance";
import {EventTypeEnum} from "../../model/models/socketMessage";
import {DatePipe} from "@angular/common";

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
  displayedColumns = ['type', 'notifName', 'dateTime', 'details'];

  constructor(private socketService: SocketService, private changeDetectorRefs: ChangeDetectorRef , private table: TableOverviewComponent){

  }

  ngOnInit() {
    this.dataSource = new TableNotificationWebapiDataSource(this.paginator, this.sort);
    var i;
    for (i = 0; i < this.table.webApiEvents.length; i++) {
      var element = this.table.webApiEvents[i];
      let line = {instanceId: element.instanceId, type:element.type, notifName: element.notifName, dateTime: element.dateTime, details: 'Instance Name: '+element.details};
      this.dataSource.add(line);
    }

    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      if (newInstance.componentType=='WebApi'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        if (newInstance.componentType=='WebApi'){
            let line = {instanceId: newInstance.id, type: 'add_circle', notifName: 'new Instance added', dateTime: actualDate, details: 'Instance Name: '+newInstance.name};
            this.dataSource.add(line);
            this.refreshTable();
          }
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).subscribe((removeInstance: Instance) => {
      if (removeInstance.componentType=='WebApi'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: removeInstance.id, type: 'delete_sweep', notifName: 'Instance removed', dateTime: actualDate, details: 'Instance Name: '+removeInstance.name};
        this.dataSource.add(line);
        this.refreshTable();
      }
    });
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.LinkStateChangedEvent).subscribe((changeInstance: Instance) => {
      if (changeInstance.componentType=='WebApi'){
        var datePipe = new DatePipe("en-US");
        var actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
        let line = {instanceId: changeInstance.id, type: 'link', notifName: 'Instance changed', dateTime: actualDate, details: changeInstance.name};
        this.dataSource.add(line);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.changeDetectorRefs.detectChanges();
    this.paginator.lastPage();
    this.paginator.firstPage();
    this.paginator._changePageSize(10);
    this.paginator._changePageSize(5);
  }
}
