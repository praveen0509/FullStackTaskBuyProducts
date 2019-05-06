import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DatabasedataService} from '../databasedata.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-buy-product-home-page',
  templateUrl: './buy-product-home-page.component.html',
  styles: [
    `
      .example-form {
        min-width: 150px;
        max-width: 500px;
        width: 10%;
      }

      .example-full-width {
        width: 100%;
        float: right;
      }

      .btn{
        color: indigo;
        background-color: cyan;
        border-color: indigo;
        border-style: dot-dash;
      }

      .autoc {
        background-color: indigo;
      }
    `
  ]
})
export class BuyProductHomePageComponent implements OnInit {

  constructor(private dbServiceObj: DatabasedataService, private router:Router, private activatedRoute: ActivatedRoute,
              private localStorage: LocalStorage) { }

  myControl = new FormControl();
  addTableFlag = false;
  homePageFlag = false;
  autoCompleteOnFlag = false;
  productFilter = { name: ''};
  userName: string;
  email: string;
  productId: number;
  productTable = [] ;
  databaseData: any ;

  options = [1, 2, 3, 4, 5];
  productCost = 0;
  netCost = 0;
  autoIncrement = 0;
  netTotal = 0;
  quantity = 1;



  ngOnInit() {
      this.databaseDataSubscribeMethod();

      this.localStorage.getItem('key').subscribe((customerDetails)=>{
        this.userName = customerDetails.userName;
        this.email = customerDetails.email;
      })
  }

  databaseDataSubscribeMethod() {
      this.dbServiceObj.getProductData().subscribe((resolve) => {
        console.log(resolve);
        this.databaseData = resolve;
      });
  }



  addProduct() {
    for (let i = 0; i < this.databaseData.length; i++) {
                                                    // total : total qauntity cost
                                                    // netTotal: Total of all the ItemsCost
                                                    // productCost: Cost of one Product:
      if (this.productFilter.name === this.databaseData[i].name) {
            this.netCost = this.productCost * this.quantity;
            this.netTotal = this.netTotal + this.netCost;
            this.addTableFlag = true;       // Enables Table
            const productObject = {};
            productObject['id'] = ++this.autoIncrement;
            productObject['productName'] =  this.productFilter.name;
            productObject['itemCost'] = this.productCost;
            productObject['quantity'] = this.quantity;
            productObject['netCost'] = this.netCost;
            this.productTable.push(productObject);

         let itemDetails = {};
           itemDetails['productId'] = --this.productId+1;
           itemDetails['quantity'] = this.quantity;
           itemDetails['totalCost'] = this.netCost;
           this.dbServiceObj.postItemData(itemDetails).subscribe((response) => console.log(response));
           this.productFilter.name = '';
           this.quantity = 1;
      }
    }
  }


  selectQuantity(id: number) {
      this.quantity = id;
  }

  productPrice(cost, productId) {
    this.productCost = cost;
    this.productId = productId;
  }

  successPageNavigationMethod() {
      let navigationextras: NavigationExtras = {
          queryParams : {
            'userName' : this.userName,
            'email'    : this.email,
            'noOfItems': this.autoIncrement,
            'totalCost': this.netTotal,
            'ItemsList': this.productTable
          }
      };


    2
    3
    4
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    let billDetails = {
      purchasedBy: this.userName,
      purchasedOn: dateTime,
      list: this.autoIncrement,
      netTotal: this.netTotal
    }
    this.dbServiceObj.postBillData(billDetails).subscribe((response) => console.log(response));

    this.router.navigate(['successPage'], navigationextras);
  }

  cancelMethod() {
    this.productTable = [];
    this.addTableFlag = false;
    this.autoIncrement = 0;
    this.netTotal = 0;
  }
}
