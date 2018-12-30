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


import {CustomHttpUrlEncodingCodec} from '../encoder';
import {Instance} from '../../model/models/instance';
import {SysInfo} from '../../model/models/sysInfo';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import {
  BASE_PATH,
  INSTANCES,
  NUMBER_OF_INSTANCES,
  SYS_INFO,
  NEW_INSTANCE,
  START_INSTANCE,
  STOP_INSTANCE,
  PAUSE_INSTANCE,
  RESUME_INSTANCE,
  DELETE_INSTANCE,
  INSTANCE_NETWORK
} from '../variables';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected basePath = '';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  public getSysInfo(): Observable<SysInfo> {
    return this.get<SysInfo>(SYS_INFO);
  }

  public getInstanceNetwork(): Observable<Array<Instance>> {
    return this.get<Array<Instance>>(INSTANCE_NETWORK);
  }

  /**
   * Find number of running instances
   * How many instances per type are running
   * @param componentType
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getNumberOfInstances(componentType: string, observe: any = 'body', reportProgress: boolean = false ): Observable<number> {
    return this.get(NUMBER_OF_INSTANCES, componentType);
  }


  /**
   * Find number of running instances
   * How many instances per type are running
   * @param componentType
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getInstances(componentType: string, observe: any = 'body', reportProgress: boolean = false): Observable<Array<Instance>> {
    return this.get(INSTANCES, componentType);
  }

  /**
   * Create an Instance
   * @param componentType
   * @param InstanceName
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public postInstance(componentType: string, name: string, observe: any = 'body', reportProgress: boolean = false): Observable<Instance> {
    return this.post(NEW_INSTANCE, componentType, name);
  }

  /**
   * Start an Instance
   * @param InstanceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public startInstance(instanceId: string, observe: any = 'body', reportProgress: boolean = false): Observable<HttpEvent<number>> {
    return this.postAction(START_INSTANCE, instanceId);
  }

  /**
   * Stop an Instance
   * @param InstanceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public stopInstance(instanceId: string, observe: any = 'body', reportProgress: boolean = false): Observable<HttpEvent<number>> {
    return this.postAction(STOP_INSTANCE, instanceId);
  }

  /**
   * Pause an Instance
   * @param InstanceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public pauseInstance(instanceId: string, observe: any = 'body', reportProgress: boolean = false): Observable<HttpEvent<number>> {
    return this.postAction(PAUSE_INSTANCE, instanceId);
  }

  /**
   * resume an Instance
   * @param InstanceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public resumeInstance(instanceId: string, observe: any = 'body', reportProgress: boolean = false): Observable<HttpEvent<number>> {
    return this.postAction(RESUME_INSTANCE, instanceId);
  }

  /**
   * Delete an Instance
   * @param InstanceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteInstance(instanceId: string): Observable<HttpEvent<number>> {
    return this.postAction(DELETE_INSTANCE, instanceId);
  }

  private get<T>(endpoint: string, componentType?: string) {

    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (componentType !== undefined) {
      queryParameters = queryParameters.set('componentType', componentType);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.get<T>(`${this.basePath}${endpoint}`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers
      }
    );
  }

  private post(endpoint: string, componentType: string, name: string, observe: any = 'body', reportProgress: boolean = false): any {
    if (componentType === null || componentType === undefined && name === null || name === undefined) {
      throw new Error('Required parameter componentType and Instance Name was null or undefined when calling getInstanceNumber.');
    }

    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (componentType !== undefined && name !== undefined) {
      queryParameters = queryParameters.set('componentType', <any>componentType);
      queryParameters = queryParameters.set('name', <any>name);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.post<Instance>(`${this.basePath}${endpoint}`, {},
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }


  private postAction(endpoint: string, idInstance: string, observe: any = 'body', reportProgress: boolean = false):
    Observable<HttpEvent<number>> {
    let queryParam = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });

    if (idInstance === null || idInstance === undefined) {
      throw new Error('Required ID Instance parameter');
    } else {
      queryParam = queryParam.set('instanceID', <any>('a' + idInstance));
    }

    return this.commonConf(endpoint, queryParam, observe, reportProgress);
  }


  private commonConf(endpoint: string, queryParameters: HttpParams, observe: any = 'body', reportProgress: boolean = false):
  Observable<HttpEvent<number>> {
    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];

    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.post<number>(`${this.basePath}${endpoint}`, {},
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }
}
