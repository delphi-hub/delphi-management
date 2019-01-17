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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusCardComponent } from './status-card.component';
import { ApiService } from 'src/app/api/api/api.service';
import { Observable } from 'rxjs';
import { SysInfo } from 'src/app/model/models/sysInfo';


describe('StatusCardComponent', () => {
  let component: StatusCardComponent;
  let fixture: ComponentFixture<StatusCardComponent>;
  const JAVA_VERSION = '1.0';
  const HOST_NAME = 'My Host Name';
  const PLATFORM_NAME = 'My Platform Name';
  const SCALA_VERSION = '2.0';
  beforeEach(async(() => {
    let apiServiceStub: Partial<ApiService>;
    apiServiceStub = {
      getSysInfo: () => new Observable<SysInfo>((observer) => {
        observer.next({
          javaVersion: JAVA_VERSION,
          hostName: HOST_NAME,
          platformName: PLATFORM_NAME,
          scalaVersion: SCALA_VERSION
        });
      })
    };
    TestBed.configureTestingModule({
      declarations: [ StatusCardComponent ],
      imports: [],
      providers: [{provide: ApiService, useValue: apiServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the dummy data stored', () => {
    expect(component.sysInfo.hostName).toBe(HOST_NAME);
    expect(component.sysInfo.javaVersion).toBe(JAVA_VERSION);
    expect(component.sysInfo.platformName).toBe(PLATFORM_NAME);
    expect(component.sysInfo.scalaVersion).toBe(SCALA_VERSION);
  });
});
