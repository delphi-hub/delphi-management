import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrawlerComponent } from './crawler/crawler.component';
import { WebappComponent } from './webapp/webapp.component';
import { WebapiComponent } from './webapi/webapi.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'crawler',
    component: CrawlerComponent,
    data: { title: 'Crawler' }
  },
  {
    path: 'webapp',
    component: WebappComponent,
    data: { title: 'Webapp' }
  },
  {
    path: 'webapi',
    component: WebapiComponent,
    data: { title: 'Webapi' }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
