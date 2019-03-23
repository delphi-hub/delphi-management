import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { SocketService } from 'src/app/api/api/socket.service';
import { Instance } from 'src/app/model/models/instance';
import { DatePipe } from '@angular/common';
import { EventTypeEnum } from 'src/app/model/models/socketMessage';
import { StoreService } from 'src/app/model/store.service';

export interface InfoCenterItem {
  instanceId: number;
  type: string;
  notifName: string;
  dateTime: string;
  details: string;
}

/**
 * Data source for the InfoCenter view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InfoCenterDataSource extends DataSource<InfoCenterItem> {
  private infoCenterSubject: BehaviorSubject<InfoCenterItem[]>;

  private instanceAddedSubscription: Subscription;
  private instanceChangedSubscription: Subscription;
  private instanceRemovedSubscription: Subscription;
  private data: InfoCenterItem[];
  public numberEvents = 0;
  private instance: Instance;

  constructor(private storeService: StoreService, private socketService: SocketService,
    private paginator: MatPaginator, private sort: MatSort, private compType: string, private instanceId: string) {
    super();
    this.data = [];
    if (this.instanceId) {
      this.instance = this.storeService.getState().instances[this.instanceId];
      if (!this.instance) {
        this.instanceId = null;
      }
    }
    this.infoCenterSubject = new BehaviorSubject<InfoCenterItem[]>([]);

    this.paginator.page.subscribe(() => { this.infoCenterSubject.next(this.getPagedData()); });
    this.sort.sortChange.subscribe(() => {this.data = this.getSortedData(this.data); this.infoCenterSubject.next(this.getPagedData()); });

    this.instanceAddedSubscription = this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).
      subscribe((newInstance: Instance) => {
        if (this.applyFilter(newInstance)) {
          const newEntry = this.transformEventToNotificaton(newInstance, 'new Instance added', 'add_circle');
          this.applyUpdate(newEntry);
        }
      });

      this.instanceRemovedSubscription = this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).
        subscribe((removeInstance: Instance) => {
          if (this.applyFilter(removeInstance)) {
            const newEntry = this.transformEventToNotificaton(removeInstance, 'Instance removed', 'delete_sweep');
            this.applyUpdate(newEntry);
          }
        });

      this.instanceChangedSubscription = this.socketService.subscribeForEvent<Instance>(EventTypeEnum.StateChangedEvent).
        subscribe((changeInstance: Instance) => {
          if (this.applyFilter(changeInstance)) {
            const newEntry = this.transformEventToNotificaton(changeInstance, 'Instance changed', 'link');
            this.applyUpdate(newEntry);
          }
        });
  }

  applyFilter(instance: Instance): boolean {
    if (!this.instanceId && !this.compType) {
      return true;
    } else {
      if (this.instanceId) {
        return instance.id === this.instance.id;
      } else {
        return instance.componentType === this.compType;
      }
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InfoCenterItem[]> {
    return this.infoCenterSubject.asObservable();
  }

  private applyUpdate(newEntry: InfoCenterItem) {
    this.data = this.getSortedData([newEntry, ...this.data]);
    this.numberEvents = this.data.length;
    this.infoCenterSubject.next(this.getPagedData());
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.instanceAddedSubscription.unsubscribe();
    this.instanceChangedSubscription.unsubscribe();
    this.instanceRemovedSubscription.unsubscribe();
    this.infoCenterSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return [...this.data].splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InfoCenterItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'notifName': return compare(a.notifName, b.notifName, isAsc);
        case 'dateTime': return compare(+a.dateTime, +b.dateTime, isAsc);
        case 'details': return compare(a.details, b.details, isAsc);
        default: return 0;
      }
    });
  }

  private transformEventToNotificaton(instance: Instance, notifName: string, type: string): InfoCenterItem {
    const datePipe = new DatePipe('en-US');
    const actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
    return {instanceId: instance.id, type: type,
      notifName: notifName, dateTime: actualDate, details: instance.name};
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
