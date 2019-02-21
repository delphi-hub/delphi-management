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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { HelpComponent } from './help/help.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TOKEN_IDENT } from './api/auth.service';
import { BASE_PATH, AUTH } from './api/variables';


@NgModule({
  declarations: [
    AppComponent,
    HelpComponent
  ],
  imports: [
    DashboardModule,
    AppRoutingModule,
    BrowserModule,
    LandingPageModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {console.log('here', localStorage.getItem(TOKEN_IDENT)); return localStorage.getItem(TOKEN_IDENT); },
        whitelistedDomains: [`${BASE_PATH}`],
        blacklistedRoutes: [`${BASE_PATH}${AUTH}`]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {
}
