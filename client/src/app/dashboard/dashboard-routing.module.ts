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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebappComponent} from './webapp/webapp.component';
import {DashboardComponent} from './dashboard.component';
import {DashboardOverviewComponent} from './dashboard-overview/dashboard-overview.component';
import {CrawlerComponent} from './crawler/crawler.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {WebApiComponent} from './webapi/web-api.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {HelpComponent} from '../help/help.component';
import { GraphViewComponent } from './graph-view/graph-view/graph-view.component';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { TableOverviewComponent } from './table-overview/table-overview.component';
import { AuthGuard } from '../AuthGuard';


const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardOverviewComponent
      },
      {
        path: 'webapp',
        component: WebappComponent
      },
      {
        path: 'crawler',
        component: CrawlerComponent
      },
      {
        path: 'webApi',
        component: WebApiComponent
      },
      {
        path: 'tableOverview',
        component: TableOverviewComponent
      },
      {
        path: 'userManagement',
        component: UserManagementComponent
      },
      {
        path: 'userProfile',
        component: UserProfileComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'graphView',
        component: GraphViewComponent
      },
      {
        path: 'instanceDetails',
        component: InstanceDetailsComponent
      }
    ]
  }];


@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})

/**
 * This module handles the routing of the dashboard.
 * It enables the header and sidebar to be only
 * rendered once and load the routed components in
 * between.
 */
export class DashboardRoutingModule {
}
