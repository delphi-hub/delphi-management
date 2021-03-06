import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Instance } from 'src/app/model/models/instance';
import { StoreService } from 'src/app/model/store.service';
import { EventService } from 'src/app/model/event.service';

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

  private eventSubscription: Subscription;
  private data: InfoCenterItem[];
  public numberEvents = 0;
  private instance: Instance;

  constructor(private storeService: StoreService, private paginator: MatPaginator,
      private sort: MatSort, private compType: string, private instanceId: string, private eventService: EventService) {
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
    this.paginator.initialized.subscribe(() => { this.infoCenterSubject.next(this.getPagedData()); });
    this.eventSubscription = this.eventService.getEventObservable().subscribe((newNotifs: InfoCenterItem[]) => {
      this.applyUpdate(newNotifs);
    });
  }

  applyFilter(notifItem: InfoCenterItem): boolean {
    if (!this.instanceId && !this.compType) {
      return true;
    } else {
      const instance = this.storeService.getState().instances[notifItem.instanceId];
      if (instance) {
        if (this.instanceId) {
          return instance.id === this.instance.id;
        } else {
          return instance.componentType === this.compType;
        }
      } else {
        return false;
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

  private applyUpdate(newEntry: InfoCenterItem[]) {

    const filteredEntries = newEntry.filter((entry => this.applyFilter(entry)));

    this.data = this.getSortedData([...filteredEntries]);
    this.numberEvents = this.data.length;
    this.infoCenterSubject.next(this.getPagedData());
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.eventSubscription.unsubscribe();
    this.paginator.page.unsubscribe();
    this.sort.sortChange.unsubscribe();
    this.infoCenterSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData() {

    if (this.paginator && this.paginator.pageIndex !== undefined && this.paginator.pageSize !== undefined) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return [...this.data].splice(startIndex, this.paginator.pageSize);
    }
    return [...this.data];
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

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
