import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserEndPoint } from "./userEndPoint";

@Injectable()
export class QueryApi {
  constructor(private http: HttpClient) { }
  doGet(url: string,  params: any) {
    url = UserEndPoint(url, params);
    console.log("url:", url);
    return this.http.get(url, {params: params});
  }

  doPost(url: string, params: any, headers?: any) {
    url = UserEndPoint(url, params);
    console.log(url);
    return this.http.post(url, params, headers)
  }


}
