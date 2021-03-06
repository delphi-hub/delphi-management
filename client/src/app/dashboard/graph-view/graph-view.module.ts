import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphViewComponent} from './graph-view/graph-view.component';
import {GraphViewService} from './graph-view.service';
import {ModelModule} from '../../model/model.module';
import { ConnectDialogComponent } from './connect-dialog/connect-dialog.component';
import { MaterialModule } from 'src/app/material-module/material.module';
import { ApiModule } from 'src/app/api/api.module';

@NgModule({
  declarations: [GraphViewComponent, ConnectDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ModelModule,
    ApiModule
  ],
  exports: [GraphViewComponent],
  providers: [GraphViewService],
  entryComponents: [
    ConnectDialogComponent
  ]
})
export class GraphViewModule {
}
