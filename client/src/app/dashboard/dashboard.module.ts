import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardComponent } from './dashboard.component';
import { CrawlerComponent } from './crawler/crawler.component';
import { WebappComponent } from './webapp/webapp.component';
import { WebapiComponent } from './webapi/webapi.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { InstanceService } from '../instance-registry-service';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardCardComponent,
    DashboardComponent,
    CrawlerComponent,
    WebappComponent,
    WebapiComponent,
    DashboardOverviewComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [InstanceService],
})
export class DashboardModule { }
