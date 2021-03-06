/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Configuration} from './configuration';

import {ApiService} from './api/api.service';
import {SocketService} from './api/socket.service';
import { AuthService } from './auth.service';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  imports:      [ CommonModule, HttpClientModule, JwtModule ],
  declarations: [],
  exports:      [],
  providers: [
    ApiService, SocketService, AuthService, JwtHelperService]
})
export class ApiModule {
  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [ { provide: Configuration, useFactory: configurationFactory } ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule?: ApiModule) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import your base AppModule only.');
    }
  }
}
