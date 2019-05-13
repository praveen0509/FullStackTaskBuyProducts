import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserEndPoint } from "./userEndPoint";

@Injectable()
export class QueryApi {
  constructor(private http: HttpClient) { }
  doGet(url: string,  params: any) {
    console.log("url:", url, " params:", params);
    url = UserEndPoint(url, params);
    return this.http.get(url, {params: params});
  }


  doPost(url: string, params: any, headers?: any) {
    url = UserEndPoint(url, params);
    return this.http.post(url, params, headers);
  }

}
