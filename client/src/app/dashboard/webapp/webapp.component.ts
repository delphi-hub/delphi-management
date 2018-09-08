import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';

export interface Element {
  status: string;
  name: string;
  version: number;
  startDate:string;
}

const ELEMENT_DATA: Element[] = [
  {status: 'Finished', name: 'test1', version: 1, startDate: Date().toLocaleString()},
  {status: 'Listining', name: 'test2', version: 2, startDate: Date().toLocaleString()},
  {status: 'Finished', name: 'test3', version: 1, startDate: Date().toLocaleString()},
  {status: 'Finished', name: 'test1', version: 3, startDate: Date().toLocaleString()}
];

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.css']
})
export class WebappComponent implements OnInit {
  dialogResult = "";
  data_array :any;

  constructor(public dialog: MatDialog) {
  }

  openAppdeleteDialog(){
    let dialogRef = this.dialog.open(DeletedialogComponent, {
      width: '250px',
      data: 'Component Data'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogResult = result;
    });
  }

  ngOnInit() {
  this.data_array = ELEMENT_DATA;
    
  }

}
