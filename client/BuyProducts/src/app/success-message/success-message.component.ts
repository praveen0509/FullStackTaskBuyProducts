import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styles: [
    `
    .table {
      background-color: antiquewhite;
      position: absolute;
      top: 200%;
      border-radius: 20px;
    }
    `
  ]
})
export class SuccessMessageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private localStorage: LocalStorage) { }
  tableData: any;
  userData: any = {};

  ngOnInit() {
    this.localStorage.getItem('key').subscribe((customerDetails)=> {
      this.userData['userName'] = customerDetails['userName'];
      this.userData['email'] = customerDetails['email'];
    })
    this.activatedRoute.queryParams.subscribe(params => {
      this.userData['noOfItems'] = params['noOfItems'];
      this.userData['totalCost'] = params['totalCost'];
    });
  }
}
