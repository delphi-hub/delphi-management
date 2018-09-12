import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebappComponent } from './webapp/webapp.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CrawlerComponent } from './crawler/crawler.component';
import { WebApiComponent } from './webapi/web-api.component';

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
     path: 'webApi',
     component: WebApiComponent
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
export class DashboardRoutingModule { }
