import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModuleModule } from '../../material-module/material-module.module';


@NgModule({
  imports: [
    ThemeModule,
    MaterialModuleModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
