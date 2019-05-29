import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabasedataService} from "../databasedata.service";
import {LocalStorage} from "@ngx-pwa/local-storage";


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

  constructor(private activatedRoute: ActivatedRoute, private dbServiceObj: DatabasedataService, private localStorage: LocalStorage) { }
  userData: any = {};
  p: number = 1;


  ngOnInit() {
    this.getUserDetails();
    this.getBillData();
  }

  getUserDetails(){
    this.localStorage.getItem('user').subscribe((customer) => {
      console.log("customer:", customer);
      this.userData['userName'] = customer['userName'];
      this.userData['email'] = customer['email'];
    })
  }

  getBillData() {
    this.dbServiceObj.getBillDataOfCurrentCustomer().subscribe((resolve) => { // Getting bill Data of Current Customer
      this.userData['noOfItems'] = resolve[0]["list"];          // Just One record will get from database
      this.userData['totalCost'] = resolve[0]["total"];
    });
  }

}





