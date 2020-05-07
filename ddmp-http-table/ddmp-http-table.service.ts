import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DdmpRequestOptions } from '../ddmp-table.config';

@Injectable()
export class DdmpHttpTableService {

    constructor(private httpClient: HttpClient) {
    }

    loadHttpData(requestOptions: DdmpRequestOptions, params: any , headers?: Array<any> ,
         requestIncepector?: Function, responseIncepector?: Function)  {
        let request: {
            requestOptions: DdmpRequestOptions
            params: any,
            headers: Array<any>,
        } = {
            requestOptions: requestOptions,
            params: params,
            headers: headers,
        };
        if (requestIncepector) {
            request = requestIncepector({
                requestOptions: requestOptions,
                params: params,
                headers: headers,
            });
        }

        const config: any = {};

        if (request.requestOptions.method === 'POST' || request.requestOptions.method === 'PUT') {
            config.body = params ;
        } else {
            config.params = params ;
        }
        config.headers = [ ...(request.requestOptions.headers ? request.requestOptions.headers : []),
         ...(request.headers ? request.headers : []) ];

        config.responseType = request.requestOptions.responseType ;

        return this.httpClient
            .request(request.requestOptions.method ? request.requestOptions.method : 'GET', request.requestOptions.url , config)
            .pipe(map(res => {
                if (responseIncepector) {
                    return responseIncepector(res);
                }
                return res ;
            }));
    }
}
