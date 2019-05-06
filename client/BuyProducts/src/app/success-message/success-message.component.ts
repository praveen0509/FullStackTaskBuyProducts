import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorage} from "@ngx-pwa/local-storage";
import {DatabasedataService} from "../databasedata.service";
import {NgFlashMessageService} from "ng-flash-messages";

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styles: [
    `
    .table {
      background-color: antiquewhite;
    }
    
    .alert-trim {
      display: inline-block;
    }
      
    .alert {
      background-color: green;
      color: azure;
    }

    .table-nonfluid {
      width: auto !important;
      background-color: darkgray;
    }
    `
  ]
})
export class SuccessMessageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private localStorage: LocalStorage, private dbServiceObj: DatabasedataService,
              private ngFlashMessageService: NgFlashMessageService) { }
  billDBData: any;
  userData: any = {};
  p: number = 1;
  displayRowPagination: number = 3;
  tableByNameFlag = false;
  tableByIdFlag = false;
  tableDataFlag = false;
  searchByName = {purchasedBy : '', id: ''};


  ngOnInit() {
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Payment successfull..."],
      dismissible: true,
      timeout: 3000,
      type: 'danger'
    });

    this.localStorage.getItem('key').subscribe((customerDetails)=> {
      this.userData['userName'] = customerDetails['userName'];
      this.userData['email'] = customerDetails['email'];
    })

    this.dbServiceObj.getBillData().subscribe((resolve) => {
      this.billDBData = resolve;
      this.userData['noOfItems'] = resolve[resolve.length-1]["list"]
      this.userData['totalCost'] = resolve[resolve.length-1]["total"]
      console.log(resolve);
    });
  }
}





