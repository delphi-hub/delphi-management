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

import { Component, OnInit, Input, ViewChild, ɵstringify } from '@angular/core';
import { Instance } from '../../api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTable, MatPaginator, MatTableDataSource } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ApiService } from '../../api';



@Component({
    selector: 'app-table-all',
    templateUrl: './table-all.component.html',
    styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {
    @Input() type: Instance.ComponentTypeEnum;

    @Input() set dataArray(dataArray: Instance[]) {
        if (this.dataSource != null) {
            this.dataSource = new MatTableDataSource<Instance>(dataArray);
        } else {
            this.dataSource.data = dataArray;
        }
    }
    @Input() compType: string;


    displayedColumns = ['ID', 'name', 'host', 'portNumber', 'instanceState', 'action'];
    dataSource: MatTableDataSource<Instance> = new MatTableDataSource<Instance>(this.dataArray);
    dialogResult: string;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(public dialog: MatDialog, private apiService: ApiService) {

    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }

    // Function to Delete the data from datasource
    openDeleteDialog(i: number, instance: Instance, id: string) {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '250px',
            data: { name: instance.name }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("delete state", instance.instanceState);
            if (result === 'Confirm' && instance.instanceState=='Running') {
                console.log("alert working");
                alert('Please Stop the Instance before you try to delete');
                console.log("data", this.dataSource.data);

            }
            else {
                this.apiService.deleteInstance(id).subscribe((result: any) => {
                    console.log('result', result);
                }, err => {
                    console.log('error start Instance');
                });
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

        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            this.apiService.postInstance(instance.componentType, dialogResult.name).subscribe((result: any) => {
                this.dataSource.data.push({
                    id: result,
                    host: '',
                    portNumber: 1,
                    name: dialogResult.name,
                    instanceState: '',
                    componentType: instance.componentType
                });
                this.table.renderRows();
            }, err => {

                console.log('error receiving data for crawler');
            });
        });
    }

    public startInstance(id: string): void {

        this.apiService.startInstance(id).subscribe((result: any) => {
            console.log('result', result);
        }, err => {
            console.log('error start Instance');
        });
    }

    public stopInstance(id: string): void {

        this.apiService.stopInstance(id).subscribe((result: any) => {
            console.log('result', result);
        }, err => {
            console.log('error stop Instance');
        });
    }

    public pauseInstance(id: string): void {

        this.apiService.pauseInstance(id).subscribe((result: any) => {
            console.log('result', result);
        }, err => {
            console.log('error pause instance');
        });
    }

  public resumeInstance(id: string): void {

    this.apiService.resumeInstance(id).subscribe((result: any) => {
      console.log('result', result);
    }, err => {
      console.log('error pause instance');
    });
  }


  public deleteInstance(id: string): void {

        this.apiService.deleteInstance(id).subscribe((result: any) => {
            console.log('result', result);
        }, err => {
            console.log('error delete instance');
        });
    }
}



