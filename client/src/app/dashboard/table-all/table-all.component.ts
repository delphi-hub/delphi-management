/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, OnInit, Input, ViewChild, ɵstringify} from '@angular/core';
import {Instance} from '../../api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTable, MatTableDataSource} from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';


@Component({
  selector: 'app-table-all',
  templateUrl: './table-all.component.html',
  styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {
  @Input() type: Instance.ComponentTypeEnum;

  @Input() set data_array(data_array: Instance[]) {
    if (this.dataSource != null) {
      this.dataSource = new MatTableDataSource<Instance>(data_array);
    } else {
      this.dataSource.data = data_array;
    }
  }
   @Input()compType : string;


  displayedColumns = ['ID', 'name', 'host', 'portNumber', 'action'];
  dataSource: MatTableDataSource<Instance> = new MatTableDataSource<Instance>(this.data_array);
  dialogResult: any;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog) {

  }

    ngOnInit() {

      //console.log('this.type in table all', this.type);
    }

  openDialog(i: number, instance: Instance) {
    console.log('instance',instance);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {name:instance.name}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result === 'Confirm') {
          console.log("data",this.dataSource.data);
          this.removeAt(i);
          }
        this.dialogResult = result;
    });
  }

  removeAt(index: number) {
    this.dataSource.data.splice(index, 1);
    this.table.renderRows();
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Function to add the data into dataSource 
  openAddDialog() {
      let instance: Instance = {};
      instance.componentType = this.type;
      const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '300px',
      data: {
        instance: instance
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status === 'Add') {
          console.log("result",result);
          console.log("instance data", result.instance);
          this.dataSource.data.push(result.instance);
          this.table.renderRows();
        }
      this.dialogResult = result;

    });
  }

}


