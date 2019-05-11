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
  billLastRowId: number;
  itemsByBillId: any;
  userData: any = {};
  p: number = 1;


  ngOnInit() {
    this.localStorage.getItem('key').subscribe((customerDetails)=> {
      this.userData['userName'] = customerDetails['userName'];
      this.userData['email'] = customerDetails['email'];
    });

    this.dbServiceObj.getBillData().subscribe((resolve) => {
      this.billLastRowId = resolve.length;
      console.log("bill Last Row:", this.billLastRowId);
      this.userData['noOfItems'] = resolve[resolve.length-1]["list"];
      this.userData['totalCost'] = resolve[resolve.length-1]["total"];
    });
  }

  displayItemsById(){
     this.dbServiceObj.getItemDataById(this.billLastRowId).subscribe((resolve)=> {
       this.itemsByBillId = resolve;
       console.log("SuccessPage:", resolve);
     })
  }
}





