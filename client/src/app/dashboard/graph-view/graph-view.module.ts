import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphViewComponent} from './graph-view/graph-view.component';
import {GraphViewService} from './graph-view.service';
import {ModelModule} from '../../model/model.module';

@NgModule({
  declarations: [GraphViewComponent],
  imports: [
    CommonModule,
    ModelModule
  ],
  exports: [GraphViewComponent],
  providers: [GraphViewService]
})
export class GraphViewModule {
}
