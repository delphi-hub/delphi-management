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

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import {HttpClientModule, HttpRequest, HttpParams, HttpClient} from '@angular/common/http';


describe('ApiService', () => {


  let service, http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ApiService],
    });

    service = TestBed.get(ApiService);
    http = TestBed.get(HttpTestingController);
  });


  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));


  it(`should post the ID in backend to stop, start, pause, resume and  delete an instance`, async(inject([ApiService, HttpTestingController], (service: ApiService, backend: HttpTestingController) => {
    service.postAction('endpoint', 'id').subscribe();
    backend.expectOne((req: HttpRequest<any>) => {
      const body = new HttpParams({ fromString: req.body });
      return req.url === `${service.basePath}${'endpoint'}`
      req.method === 'POST'
      && body.get('Id') === 'id';
    }, `POST to stop, start, pause, resume and  delete an instance`);
  })));

  it(`should post the Instance type and instance name in backend to deploy an instance`, async(inject([ApiService, HttpTestingController], (service: ApiService, backend: HttpTestingController) => {
    service.post('endpoint' ,'type', 'name' ).subscribe();
    backend.expectOne((req: HttpRequest<any>) => {
      const body = new HttpParams({ fromString: req.body });
      return req.url === `${service.basePath}${'endpoint'}`
      req.method === 'POST'
      && body.get('componentType') === 'type'
      && body.get('name') === 'name';
    }, `POST to deploy an instance`);
  })));

  it(`should post an instance calling postAction`,async(inject([ApiService], (service: ApiService)=>{
    spyOn(service, 'post');
    service.postInstance('id', 'name');
    expect(service.post).toHaveBeenCalled();
  })));
  it(`should start an instance calling postAction`,async(inject([ApiService], (service: ApiService)=>{
    spyOn(service, 'postAction');
    service.startInstance('id');
    expect(service.postAction).toHaveBeenCalled();
  })));

  it(`should stop an instance calling postAction`,async(inject([ApiService], (service: ApiService)=>{
    spyOn(service, 'postAction');
    service.stopInstance('id');
    expect(service.postAction).toHaveBeenCalled();
  })));

  it(`should pause an instance calling postAction`,async(inject([ApiService], (service: ApiService)=>{
    spyOn(service, 'postAction');
    service.pauseInstance('id');
    expect(service.postAction).toHaveBeenCalled();
  })));

  it(`should resume an instance calling postAction`,async(inject([ApiService], (service: ApiService)=>{
    spyOn(service, 'postAction');
    service.resumeInstance('id');
    expect(service.postAction).toHaveBeenCalled();
  })));

  it(`should delete an instance calling postAction`,async(inject([ApiService], (service: ApiService)=>{
    spyOn(service, 'postAction');
    service.deleteInstance('id');
    expect(service.postAction).toHaveBeenCalled();
  })));

});
