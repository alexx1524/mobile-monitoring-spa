/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AddMonitoringDataRequest } from '../models/add-monitoring-data-request';
import { MonitoringData } from '../models/monitoring-data';
import { MonitoringDataSearchResult } from '../models/monitoring-data-search-result';
import { MonitoringSearchCriteria } from '../models/monitoring-search-criteria';
@Injectable({
  providedIn: 'root',
})
class MonitoringService extends __BaseService {
  static readonly postMonitoringPath = '/monitoring';
  static readonly getMonitoringIdPath = '/monitoring/{id}';
  static readonly getMonitoringListPath = '/monitoring/list';
  static readonly postMonitoringSearchPath = '/monitoring/search';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Создание или обновление мониторинговых данных для устройства.
   * @param body Запрос на добавление/обновление данных мониторинга.
   */
  postMonitoringResponse(body?: AddMonitoringDataRequest): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/monitoring`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Создание или обновление мониторинговых данных для устройства.
   * @param body Запрос на добавление/обновление данных мониторинга.
   */
  postMonitoring(body?: AddMonitoringDataRequest): __Observable<null> {
    return this.postMonitoringResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Получение последних мониторинговых данных по идентификатору устройства.
   * @param id Идентификатор устройства.
   * @return Success
   */
  getMonitoringIdResponse(id: string): __Observable<__StrictHttpResponse<MonitoringData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/monitoring/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MonitoringData>;
      })
    );
  }
  /**
   * Получение последних мониторинговых данных по идентификатору устройства.
   * @param id Идентификатор устройства.
   * @return Success
   */
  getMonitoringId(id: string): __Observable<MonitoringData> {
    return this.getMonitoringIdResponse(id).pipe(
      __map(_r => _r.body as MonitoringData)
    );
  }

  /**
   * Получение всех мониторинговых данных.
   * @return Success
   */
  getMonitoringListResponse(): __Observable<__StrictHttpResponse<Array<MonitoringData>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/monitoring/list`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MonitoringData>>;
      })
    );
  }
  /**
   * Получение всех мониторинговых данных.
   * @return Success
   */
  getMonitoringList(): __Observable<Array<MonitoringData>> {
    return this.getMonitoringListResponse().pipe(
      __map(_r => _r.body as Array<MonitoringData>)
    );
  }

  /**
   * Получение мониторинговых данных по указанным критериям.
   * @param body Критерии поиска.
   * @return Success
   */
  postMonitoringSearchResponse(body?: MonitoringSearchCriteria): __Observable<__StrictHttpResponse<MonitoringDataSearchResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/monitoring/search`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MonitoringDataSearchResult>;
      })
    );
  }
  /**
   * Получение мониторинговых данных по указанным критериям.
   * @param body Критерии поиска.
   * @return Success
   */
  postMonitoringSearch(body?: MonitoringSearchCriteria): __Observable<MonitoringDataSearchResult> {
    return this.postMonitoringSearchResponse(body).pipe(
      __map(_r => _r.body as MonitoringDataSearchResult)
    );
  }
}

module MonitoringService {
}

export { MonitoringService }
