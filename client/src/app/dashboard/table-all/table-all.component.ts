import { Component, OnInit, Input } from '@angular/core';
import {Instance} from '../../api';
import { SelectionModel} from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';


@Component({
  selector: 'app-table-all',
  templateUrl: './table-all.component.html',
  styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {

  @Input() set data_array(data_array: Instance[]) {
    console.log('here with data_array', data_array);
    if (this.dataSource != null) {
      this.dataSource = new MatTableDataSource<Instance>(data_array);
      console.log('created data source', this.dataSource);
    } else {
      this.dataSource.data = data_array;
    }
  }
  displayedColumns = ['ID', 'name', 'host', 'portNumber', 'action', 'select'];
  dataSource: MatTableDataSource<Instance> = new MatTableDataSource<Instance>(this.data_array);
  selection = new SelectionModel<Instance>(true, []);
  dialogResult: any;

  constructor(public dialog: MatDialog) {

  }


  ngOnInit() {
 }

  openDialog() {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: '250px',
      data: 'Component Data'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogResult = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data_array.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.data_array.forEach(row => this.selection.select(row));
  }
}


