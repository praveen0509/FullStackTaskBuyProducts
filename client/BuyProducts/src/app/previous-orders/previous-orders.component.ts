import { Component, OnInit } from '@angular/core';
import {DatabasedataService} from "../databasedata.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styles: [`
    .split {
      height: 100%;
      top: 10%;
      position: fixed;
      overflow-x: hidden;
    }
    
    .left{
     width: 20%;
     left: 0; 
    }
    
    .right{
      width: 80%;
      right: 0;
    }
    
    .imagesUl li{
      margin-bottom: 10%;
    }
    
  `]
})
export class PreviousOrdersComponent implements OnInit {

  pageNo = 1;
  page: any;
  itemsPerPage = 10;
  search = {purchasedBy: '', total: ''};
  billData: any;
  total: any;

  constructor(private dbServiceObj: DatabasedataService, private router: Router ) { }

  ngOnInit() {
    this.getBillsPaginationSearch(1);       // Calling Product Data having pagination with default pageNo set to 1
  }

  getBillsPaginationSearch(pageNumber) {
    this.pageNo = pageNumber;
    this.page = { pageNo: this.pageNo, itemsPerPage: this.itemsPerPage};
    this.dbServiceObj.getBillDataWithPageAndSearch(this.page, this.search).subscribe((response) => {
      console.log(response);
      this.billData = response.rows;
      this.total=response.count;
    });
  }

  navigateToCustomerDetails(customerId){
    console.log("id:", customerId);
    this.router.navigate(['/customerDetails', customerId] );
  }

}
