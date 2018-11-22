import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphViewComponent} from './graph-view/graph-view.component';
import {GraphViewService} from './graph-view.service';
import {ApiModule} from '../../api/api.module';

@NgModule({
  declarations: [GraphViewComponent],
  imports: [
    CommonModule,
    ApiModule
  ],
  exports: [GraphViewComponent],
  providers: [GraphViewService]
})
export class GraphViewModule {
}
