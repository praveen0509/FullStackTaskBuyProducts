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
      .alert-trim {
        display: inline-block;
      }

      .alert {
        background-color: green;
        color: azure;
      }

      .table-nonfluid {
        width: auto !important;
      }
    `
  ]
})
export class SuccessMessageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private localStorage: LocalStorage, private dbServiceObj: DatabasedataService) { }
  userData: any = {};
  p: number = 1;


  ngOnInit() {
    this.localStorage.getItem('key').subscribe((customerDetails)=> {
      this.userData['userName'] = customerDetails['userName'];
      this.userData['email'] = customerDetails['email'];
    });
    this.getBillData();
  }


  getBillData() {
    this.dbServiceObj.getBillDataOfCurrentCustomer().subscribe((resolve) => { // Getting bill Data of Current Customer
      this.userData['noOfItems'] = resolve[0]["list"];          // Just One record will get from database
      this.userData['totalCost'] = resolve[0]["total"];
    });
  }

}





