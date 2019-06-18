import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatabasedataService} from "../databasedata.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styles: [`
    ul li{
      font-size: 150%;
      font-family: "Noto Sans CJK JP Bold";
      margin-bottom: 1%;
    }
    
  `]
})
export class CustomerDetailsComponent implements OnInit {

  customerId: number;
  customerDetails: any;
  billDetails: any;
  constructor(private activatedRoute: ActivatedRoute, private dbServiceObj: DatabasedataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {      // Getting CustomerId from previousOrdersComponent
      this.customerId = params.customerId;
    });
    this.getItemDetailsById();
  }


  getItemDetailsById(){
    this.dbServiceObj.getItemDataById(this.customerId).subscribe((itemData)=>{
      console.log("itemData:", itemData);
      this.customerDetails = itemData;
    })
  }
  
}
