import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


//Data model type
export interface DatatableNotifItem {
  type: string;
  notifName: string;
  dateTime: string;
  details: Array<string>;
}

// TODO: replace this with real data from the application coming from the Server
// TODO: function to write
/*function getDataNotifications(){

}
*
* */
const EXAMPLE_DATA: DatatableNotifItem[] = [
  {type: 'warning', notifName: 'Demo overwritten', dateTime:'12:15', details:["1","2","3","4"]},
  {type: 'done', notifName: 'Demo success', dateTime:'12:15', details:["1","2","3","4"]},
  {type: 'close', notifName: 'Demo failed', dateTime:'12:15', details:["1","2","3","4"]},
  ];

/**
 * Data source for the DatatableNotif view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DatatableNotifDataSource extends DataSource<DatatableNotifItem> {
  data: DatatableNotifItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DatatableNotifItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DatatableNotifItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DatatableNotifItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'notifName': return compare(a.notifName, b.notifName, isAsc);
        case 'dateTime': return compare(a.dateTime, b.dateTime, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
