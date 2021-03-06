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
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ApiService],
    });

  });


  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created an instance', inject([ApiService], (apiService: ApiService) => {
    expect(apiService).toBeTruthy();
  }));

  it(`should create an instance`,
    async(inject([ApiService], (apiService: ApiService) => {
      expect(apiService.postInstance('', '')).not.toBeNull();
    })));

  it(`should start an instance`,
    async(inject([ApiService], (apiService: ApiService) => {
      expect(apiService.startInstance('', '')).not.toBeNull();
    })));

  it(`should stop an instance`,
    async(inject([ApiService], (apiService: ApiService) => {
      expect(apiService.stopInstance('', '')).not.toBeNull();
    })));

  it(`should pause an instance`,
    async(inject([ApiService], (apiService: ApiService) => {
      expect(apiService.pauseInstance('')).not.toBeNull();
    })));

  it(`should resume an instance`,
    async(inject([ApiService], (apiService: ApiService) => {
      expect(apiService.resumeInstance('')).not.toBeNull();
    })));

  it(`should delete an instance`,
    async(inject([ApiService], (apiService: ApiService) => {
      expect(apiService.deleteInstance('')).not.toBeNull();
    })));

});
