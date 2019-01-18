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

import {Instance} from '../../model/models/instance';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { HttpEvent } from '@angular/common/http';
import { ModelService } from 'src/app/model/model.service';
import { ApiService } from 'src/app/api/api/api.service';


@Component({
    selector: 'app-table-all',
    templateUrl: './table-all.component.html',
    styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {
    @Input() type: Instance['componentType'];

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

    constructor(public dialog: MatDialog, private apiService: ApiService, private modelService: ModelService) {
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }

    /**
   * Function for deleting an insatnce. Cannot delete an instance if its running.
   * Prompts to Stop the instance before deleting.
   * @param InstanceID
   */
    openDeleteDialog(i: number, instance: Instance, id: string) {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '250px',
            data: { name: instance.name }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('delete state', instance.instanceState);
            if (result === 'Confirm' && instance.instanceState === 'Running') {
                console.log('alert working');
                alert('Please Stop the Instance before you try to delete');
                console.log('data', this.dataSource.data);

            } else {
                if (result !== 'Cancle') {
                    this.apiService.deleteInstance(id).subscribe((deleteResult: HttpEvent<number>) => {
                        console.log('result', deleteResult);
                    }, err => {
                        console.log('error delete Instance', err);
                    });
                    this.removeAt(i);
                }
             }
            this.dialogResult = result;
        });
    }

    removeAt(index: number) {
        this.dataSource.data.splice(index, 1);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

   /**
   * Adding an instance using mat-dialog component
   * @param componentType
   * @param componentName
   */
    openAddDialog() {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            width: '300px',

        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult === 'Add') {
                this.apiService.postInstance(this.type, dialogResult.name).subscribe((result: Instance) => {
                    this.dataSource.data.push(result);
                }, (err: any) => {
                    console.log('error receiving data for crawler', err);
                });
            }
        });
    }

   /**
   * Function used to control the state of the instance. Case1: 'start' an instance
   * @param InstanceID
   */
    public startInstance(id: string): void {

        this.apiService.startInstance(id).subscribe(() => {
        }, err => {
            console.log('error start Instance', err);
        });
    }

    /**
   * Function used to control the state of the instance. Case2: 'stop' an instance
   * @param InstanceID
   */
    public stopInstance(id: string): void {

        this.apiService.stopInstance(id).subscribe(() => {
        }, err => {
            console.log('error stop Instance', err);
        });
    }

    /**
   * Function used to control the state of the instance. Case3: 'Pause' an instance
   * @param InstanceID
   */
    public pauseInstance(id: string): void {

        this.apiService.pauseInstance(id).subscribe(() => {
        }, err => {
            console.log('error pause instance', err);
        });
    }

    /**
   * Function used to control the state of the instance. Case4: 'Resume' an instance if Paused
   * @param InstanceID
   */
    public resumeInstance(id: string): void {

        this.apiService.resumeInstance(id).subscribe(() => {
        }, err => {
            console.log('error pause instance', err);
        });
    }

}
