import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebappComponent } from './webapp/webapp.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CrawlerComponent } from './crawler/crawler.component';
import { WebapiComponent } from './webapi/webapi.component';
import { HeaderComponent } from './header/header.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HelpComponent } from './help/help.component';
  


const dashboardRoutes: Routes = [
   {
   path: 'dashboard',
  component: DashboardComponent,
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
     path: 'webapi',
     component: WebapiComponent
   },
   ]
   },
   {
      path: 'usermanagement',
      component: UserManagementComponent
    },
    {
      path: 'help',
      component: HelpComponent
    }
    ];
  

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
export class DashboardRoutingModule { }
