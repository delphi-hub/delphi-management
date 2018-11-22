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

import {Component, Input, OnInit} from '@angular/core';
import {Instance} from '../../model/models/instance';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-table-all',
  templateUrl: './table-all.component.html',
  styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {

  @Input() set data_array(data_array: Instance[]) {
    if (this.dataSource != null) {
      this.dataSource = new MatTableDataSource<Instance>(data_array);
    } else {
      this.dataSource.data = data_array;
    }
  }
  displayedColumns = ['ID', 'name', 'host', 'portNumber', 'select'];
  dataSource: MatTableDataSource<Instance> = new MatTableDataSource<Instance>(this.data_array);
  selection = new SelectionModel<Instance>(true, []);
  dialogResult: any;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
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
        this.data_array.forEach((row) => {this.selection.select(row); });
  }
}


