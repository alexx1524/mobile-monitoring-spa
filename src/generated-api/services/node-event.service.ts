/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NodeEvent } from '../models/node-event';
@Injectable({
  providedIn: 'root',
})
class NodeEventService extends __BaseService {
  static readonly postEventPath = '/event';
  static readonly getEventBynodeNodeIdPath = '/event/bynode/{nodeId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Добавление ивентов ноды (устройства).
   * @param body Список ивентов от ноды.
   */
  postEventResponse(body?: Array<NodeEvent>): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/event`,
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
   * Добавление ивентов ноды (устройства).
   * @param body Список ивентов от ноды.
   */
  postEvent(body?: Array<NodeEvent>): __Observable<null> {
    return this.postEventResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Получение списка событий по идентификатору ноды (устройства).
   * @param nodeId Идентификатор узла (устройства).
   * @return Success
   */
  getEventBynodeNodeIdResponse(nodeId: string): __Observable<__StrictHttpResponse<Array<NodeEvent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/event/bynode/${encodeURIComponent(String(nodeId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<NodeEvent>>;
      })
    );
  }
  /**
   * Получение списка событий по идентификатору ноды (устройства).
   * @param nodeId Идентификатор узла (устройства).
   * @return Success
   */
  getEventBynodeNodeId(nodeId: string): __Observable<Array<NodeEvent>> {
    return this.getEventBynodeNodeIdResponse(nodeId).pipe(
      __map(_r => _r.body as Array<NodeEvent>)
    );
  }
}

module NodeEventService {
}

export { NodeEventService };
