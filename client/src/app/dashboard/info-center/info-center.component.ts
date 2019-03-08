import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {InfoCenterDataSource, InfoCenterItem } from './info-center-datasource';
import {SocketService} from '../../api/api/socket.service';
import {DatePipe} from '@angular/common';
import {EventTypeEnum} from '../../model/models/socketMessage';
import {Instance} from '../../model/models/instance';

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

  constructor(private socketService: SocketService, private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource = new InfoCenterDataSource(this.paginator, this.sort);

      this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      const newEntry = this.transformEventToNotificaton(newInstance, 'new Instance added', 'add_circle');
      this.applyUpdate(newEntry);
    });

    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).subscribe((removeInstance: Instance) => {
      const newEntry = this.transformEventToNotificaton(removeInstance, 'Instance removed', 'delete_sweep');
      this.applyUpdate(newEntry);
    });

    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.StateChangedEvent).subscribe((changeInstance: Instance) => {
      const newEntry = this.transformEventToNotificaton(changeInstance, 'Instance changed', 'link');
      this.applyUpdate(newEntry);
    });
  }

  private transformEventToNotificaton(instance: Instance, notifName: string, type: string): InfoCenterItem {
    const datePipe = new DatePipe('en-US');
    const actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
    return {instanceId: instance.id, type: type,
      notifName: notifName, dateTime: actualDate, details: instance.name};
  }

  private applyUpdate(newEntry: InfoCenterItem) {
    this.dataSource.add(newEntry);
    this.changeDetectorRefs.detectChanges();
    this.paginator.lastPage();
    this.paginator.firstPage();
  }
}
