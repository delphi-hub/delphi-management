import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModelService} from './model.service';
import {StoreService} from './store.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [ModelService, StoreService]
})
export class ModelModule {
}
