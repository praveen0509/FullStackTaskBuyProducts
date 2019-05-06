import { Injectable } from '@angular/core';
import {QueryApi} from "./commonServices/request/QueryApi";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DatabasedataService {

  constructor(private queryApi: QueryApi) { }

  getProductData() : Observable <any> {
    let req;
    return this.queryApi.doGet('PRODUCT_DETAILS', req).pipe(catchError(err => of([err])));
  }

  getBillData() : Observable <any> {
    let req;
    return this.queryApi.doGet('BILL_DETAILS', req).pipe(catchError(err => of([err])));
  }

  postItemData(itemDetails): Observable<any> {
    return this.queryApi.doPost('INSERT_DATA_INTO_ITEM', itemDetails).pipe(catchError(err => of([err])));
  }

  postBillData(billDetails): Observable<any> {
    return this.queryApi.doPost('INSERT_DATA_INTO_BILL', billDetails).pipe(catchError(err => of([err])));
  }

}
