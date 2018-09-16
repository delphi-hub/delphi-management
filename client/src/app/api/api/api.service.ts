import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Configuration} from "../configuration";
import {BASE_PATH, INSTANCES, NUMBER_OF_INSTANCES} from "../variables";
import {CustomHttpUrlEncodingCodec} from "../encoder";
import {Instance} from "..";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected basePath = '';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient,
              @Optional()@Inject(BASE_PATH) basePath: string,
              @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * Find number of running instances
   * How many instances per type are running
   * @param componentType
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getNumberOfInstances(componentType: string, observe: any = 'body', reportProgress: boolean = false ): Observable<number> {
    return this.get(NUMBER_OF_INSTANCES, componentType)
  }

  /**
   * Find number of running instances
   * How many instances per type are running
   * @param componentType
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getInstances(componentType: string, observe: any = 'body', reportProgress: boolean = false ): Observable<Array<Instance>> {
    return this.get(INSTANCES, componentType)
  }

  private get(endpoint: string, componentType, observe: any = 'body', reportProgress: boolean = false ): any{
    if (componentType === null || componentType === undefined) {
      throw new Error('Required parameter componentType was null or undefined when calling getInstanceNumber.');
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (componentType !== undefined) {
      queryParameters = queryParameters.set('componentType', <any>componentType);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json'
    ];
    let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set("Accept", httpHeaderAcceptSelected);
    }

    return this.httpClient.get<Instance | number>(`${this.basePath}${endpoint}`,
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
