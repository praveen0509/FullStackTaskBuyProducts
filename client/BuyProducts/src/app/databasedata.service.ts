import { Injectable } from '@angular/core';
import {QueryApi} from "./commonServices/request/QueryApi";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DatabasedataService {

  constructor(private queryApi: QueryApi) { }

  private subject = new Subject<any>();

  getProductData() : Observable <any> {
    let req;
    return this.queryApi.doGet('PRODUCT_DETAILS', req).pipe(catchError(err => of([err])));
  }

  /*Getting Product data having On efield with muktiple attributes*/
  getProductDataWithPageAndSearch(page): Observable<any> {
    return this.queryApi.doPost('PRODUCT_DETAILS_WITH_ONE_FIELD', page).pipe(catchError(err => of([err])));
  }

  /*Getting Product Data with Individual search*/
  getProductsByIndividualFields(page): Observable<any> {
    console.log("service page:",page);
    return this.queryApi.doPost('PRODUCT_DETAILS_WITH_MULTIPLE_FIELDS', page).pipe(catchError(err => of([err])));
  }

  getBillData() : Observable <any> {
    let req
    return this.queryApi.doGet('BILL_DETAILS', req).pipe(catchError(err => of([err])));
  }



  //Get Bill Data of Current User
  getBillDataOfCurrentCustomer(): Observable<any> {
    let req
    return this.queryApi.doGet('BILL_DATA_CURRENT_CUSTOMER', req).pipe(catchError(err => of([err])));
  }


  getBillDataWithPageAndSearch(page, search): Observable<any> {
    return this.queryApi.doPost('BILL_DETAILS_WITH_PAGE', {"page":page, "search":search}).pipe(catchError(err => of([err])));
  }


  getItemDataById(id) : Observable<any> {
    console.log(id);
      return this.queryApi.doGet('ITEM_BY_ID', id).pipe(catchError(err => of([err])));
  }


  postItemData(itemDetails): Observable<any> {
    return this.queryApi.doPost('INSERT_DATA_INTO_ITEM', itemDetails).pipe(catchError(err => of([err])));
  }


  bulkPostItemData(listOfItemsDetails, billId): Observable<any> {
    return this.queryApi.doPost('BULK_INSERT_DATA_INTO_ITEM', {"itemDetails":listOfItemsDetails,"billId":billId})
      .pipe(catchError(err => of([err],console.log('eerrr'))));
  }


  postBillData(billDetails): Observable<any> {
    return this.queryApi.doPost('INSERT_DATA_INTO_BILL', billDetails)
      .pipe(catchError(err => of([err])));
  }



  setProductTableData(productTable: any){
      this.subject.next({data: productTable});
  }


  getProductTableData(): Observable<any>{
    return this.subject.asObservable();
  }




}
