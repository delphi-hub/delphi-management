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
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';
import { LabelDeleteComponent } from '../label-delete/label-delete.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpEvent } from '@angular/common/http';
import { ModelService } from 'src/app/model/model.service';
import { ApiService } from 'src/app/api/api/api.service';


@Component({
    selector: 'app-table-all',
    templateUrl: './table-all.component.html',
    styleUrls: ['./table-all.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class TableAllComponent implements OnInit {
    @Input() type: Instance['componentType'];

    @Input() hideControlElements = false;

    @Input() set dataArray(dataArray: Instance[]) {

        if (this.dataSource == null) {
            this.dataSource = new MatTableDataSource<Instance>(dataArray);
        } else {
            this.dataSource.data = dataArray;
        }
        if (this.expandedID != null) {
            const newExpanded = dataArray.filter((value) => value.id === this.expandedID);
            if (newExpanded.length > 1) {
                this.expandedElement = null;
                this.expandedID = null;
            } else {
                this.expandedElement = newExpanded[0];
                this.onRowClicked(this.expandedElement, true);
            }
        }
    }


    displayedColumns = ['ID', 'name', 'host', 'portNumber', 'instanceState', 'action', 'Details'];
    columnsToDisplay: string[] = ['dockerId', 'labels'];
    dataSource: MatTableDataSource<Instance> = new MatTableDataSource<Instance>(this.dataArray);
    data = new MatTableDataSource<{dockerId: string, labels: string[]}>();
    dialogResult: string;
    expandedElement: Instance;
    expandedID: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private apiService: ApiService, private modelService: ModelService) {
    }

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

            if (result === 'Confirm' && instance.instanceState === 'Running') {
                alert('Please Stop the Instance before you try to delete');
            } else {
                if (result !== 'Cancel') {
                    this.apiService.deleteInstance(id).subscribe((deleteResult: HttpEvent<number>) => {
                        this.removeAt(i);
                    }, err => {
                        console.log('error delete Instance', err);
                        if (err.status === 400) {
                            alert('Cannot delete this instance, other running instances are depending on it');
                        }
                    });
                }
             }
            this.dialogResult = result;
        });
    }

       /**
    * Function for deleting a label.
    * @param InstanceID
    */
   openLabelDelete(i: number, id: string, label: string) {
    const deletedialogRef = this.dialog.open(LabelDeleteComponent, {
        width: '250px',
        data: { name: label }
    });

    deletedialogRef.afterClosed().subscribe(result => {
        if (result !== 'Cancel') {
            this.apiService.deleteLabel(id, label).subscribe((deleteResult: HttpEvent<number>) => {
                this.removeAt(i);
            }, err => {
                console.log('error delete label', err);
            });
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
            if (dialogResult === 'CancelAdd') {
                dialogRef.close();
            } else {
                console.log('dialogResult', dialogResult);
                this.apiService.postInstance(this.type, dialogResult.name).subscribe((result: Instance) => {
                    this.dataSource.data.push(result);
                }, err => {

                    console.log('error receiving data for crawler');
                });
            }
        });
    }

    /**
   * Adding a custom label using mat-dialog component
   * @param InstanceID
   * @param labelName
   */
    openlabelDialog(id: string) {
        const labelDialogRef = this.dialog.open(LabelDialogComponent, {
            width: '300px',

        });

        labelDialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult === 'CancelLabel') {
                labelDialogRef.close();
            } else {
                this.apiService.labelInstance(id, dialogResult.labelName).subscribe((result: Instance) => {
                    this.dataSource.data.push(result);
                }, err => {

                    console.log('error receiving data for label');
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

     /**
   * Function used to expand table row and show details of Docker and Labels
   */
  onRowClicked(row: Instance, reload= false) {
    if (!reload && row.id === this.expandedID) {
        this.expandedElement = null;
        this.expandedID = null;
        this.data.data = null;
    } else {
        let filteredList: Array<{dockerId: string, labels: string[]}>;
        this.expandedID = row.id;
        this.expandedElement = row;
        const NoId = 'Id not available';
        const NoIdLabels = [];
        if (row.dockerId !== undefined && row.labels.length !== 0) {
            filteredList = [{ dockerId: row.dockerId, labels: row.labels }];
        } else if (row.dockerId === undefined && row.labels.length !== 0) {
            filteredList = [{ dockerId: NoId, labels: row.labels }];
        } else if (row.dockerId !== undefined && row.labels.length === 0) {
            filteredList = [{ dockerId: row.dockerId, labels: NoIdLabels }];
        } else {
            filteredList = [{ dockerId: NoId, labels: NoIdLabels }];
        }
        this.data.data = filteredList;
    }
}

}
