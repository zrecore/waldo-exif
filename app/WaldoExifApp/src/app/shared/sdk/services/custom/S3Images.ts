/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { S3Images } from '../../models/S3Images';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `S3Images` model.
 */
@Injectable()
export class S3ImagesApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, searchParams, errorHandler);
  }

  /**
   * Import S3 Data (XML) from URL
   *
   * @param {object} data Request data.
   *
   *  - `urlEnpoint` – `{string}` - Amazon S3 URL endpoint.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `totalRecordsImported` – `{number}` - Total amount of records imported
   *
   *  - `totalRecordsFound` – `{number}` - Total amount of records found
   */
  public importS3Data(urlEnpoint: any): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/S3Images/imports3data";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (urlEnpoint) _urlParams.urlEnpoint = urlEnpoint;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `S3Images`.
   */
  public getModelName() {
    return "S3Images";
  }
}
