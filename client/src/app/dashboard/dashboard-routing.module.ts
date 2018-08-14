import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebappComponent } from './webapp/webapp.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CrawlerComponent } from './crawler/crawler.component';
import { WebapiComponent } from './webapi/webapi.component';

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
   }
  ]
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
export class DashboardRoutingModule { }
