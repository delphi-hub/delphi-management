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

import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/models/user';
import { ApiService } from 'src/app/api/api/api.service';
import { HttpEvent } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { UserAddComponent } from '../user-add/user-add.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  public userList: User[];
  displayedColumns: string[] = ['id', 'userName', 'userType', 'action'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogResultUser: string;


  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    /**
    * Function to GET all the users.
    */

    this.apiService.getUsers().subscribe(userResponse => {
      this.dataSource.data = userResponse;
    });
  }

  /**
  * Function for adding a User. 
  * @param UserName
  * @param Secret
  * @param UserType
  */

  openAddUser() {
    const dialogRefUser = this.dialog.open(UserAddComponent, {
      width: '300px',

    });

    dialogRefUser.afterClosed().subscribe(dialogResultUser => {
      if (dialogResultUser === 'CancelAdd') {
        dialogRefUser.close();
      } else {
        this.apiService.postUser(dialogResultUser.userName, dialogResultUser.secret, dialogResultUser.userType.values)
        .subscribe(() => {
          this.apiService.getUsers().subscribe(userResponse => {
            this.dataSource.data = userResponse;
          });
        }, (err) => {

          console.log('error during post user', err);
        });
      }
    });
  }

  /**
    * Function for deleting a user. 
    * @param userID
    */

  openDeleteUser(i: number, user: User, id: string) {
    const dialogRefUser = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: { userName: user.userName }
    });

    dialogRefUser.afterClosed().subscribe(result => {
      if (result !== 'Cancel') {
        this.apiService.deleteUser(id).subscribe(() => {
          this.apiService.getUsers().subscribe(userResponse => {
            this.dataSource.data = userResponse;
          });
        }, err => {
          console.log('error delete Instance', err);
          if (err.status === 400) {
            alert('Cannot delete this instance, other running instances are depending on it');
          }
        });
      }
      this.dialogResultUser = result;
    });
  }

  removeAt(index: number) {
    this.dataSource.data.splice(index, 1);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
