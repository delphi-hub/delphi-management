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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardComponent } from './dashboard.component';
import { CrawlerComponent } from './crawler/crawler.component';
import { WebappComponent } from './webapp/webapp.component';
import { WebApiComponent } from './webapi/web-api.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { TableAllComponent } from './table-all/table-all.component';
import { HeaderComponent } from './header/header.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import {ApiModule} from '../api/api.module';
import {ModelModule} from '../model/model.module';
import { MaterialModule } from '../material-module/material.module';
import { GraphViewModule } from './graph-view/graph-view.module';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { TableOverviewComponent } from './table-overview/table-overview.component';
import { InfoCenterComponent } from './info-center/info-center.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LabelDialogComponent } from './label-dialog/label-dialog.component';
import { UserAddComponent } from './user-add/user-add.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { LabelDeleteComponent } from './label-delete/label-delete.component';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DashboardRoutingModule,
    ApiModule,
    ModelModule,
    GraphViewModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatChipsModule
  ],
  declarations: [
    DashboardCardComponent,
    DashboardComponent,
    CrawlerComponent,
    WebappComponent,
    WebApiComponent,
    DashboardOverviewComponent,
    TableAllComponent,
    HeaderComponent,
    StatusCardComponent,
    UserProfileComponent,
    UserManagementComponent,
    DeleteDialogComponent,
    AddDialogComponent,
    InstanceDetailsComponent,
    InfoCenterComponent,
    TableOverviewComponent,
    LabelDialogComponent,
    UserAddComponent,
    DeleteUserComponent,
    LabelDeleteComponent
  ],
  entryComponents: [
    DeleteDialogComponent, AddDialogComponent, LabelDialogComponent, UserAddComponent, DeleteUserComponent, LabelDeleteComponent
  ],
  providers: [],
})
export class DashboardModule { }
