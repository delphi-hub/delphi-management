import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatTableModule} from '@angular/material';
import { MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
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
import {ApiService} from '../api';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    DashboardRoutingModule
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
    DeletedialogComponent
  ],
  entryComponents: [
    DeletedialogComponent
  ],
  providers: [ApiService],
})
export class DashboardModule { }
