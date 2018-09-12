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
  @Input() data_array: Instance[];
  displayedColumns = ['ID', 'name', 'host', 'portNumber', 'action', 'select'];
  dataSource: MatTableDataSource<Instance>;
  selection = new SelectionModel<Element>(true, []);
  dialogResult: any;

  constructor(public dialog: MatDialog) {

  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource<Instance>(this.data_array);
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


