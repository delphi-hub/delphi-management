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

import { async, TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';

describe('component: DashboardComponent', () => {

  let location: Location, router: Router;


  beforeEach(() => {

    TestBed.configureTestingModule({
    imports: [
    RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent }
      ])
    ],
      declarations: [ DashboardComponent, HeaderComponent],
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));

  it('should go to dashboard', async(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    router.navigate(['/dashboard']).then(() => {
      expect(location.path()).toBe('/dashboard');
    });
  }));
});
