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
        background-color: orchid;
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
  addTableFlag = false;
  productFilter = { name: ''};
  userName: string;
  email: string;
  myControl = new FormControl();
  options = [1, 2, 3, 4, 5];
  productCost = 0;
  netCost = 0;
  autoIncrement = 0;
  netTotal = 0;
  homePageFlag = false;
  productId: number;
  productTable = [] ;
  quantity = 1;
  databaseData: any ;
  welcomeMessageFlag = true;

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
            this.productFilter.name = '';

            let itemDetails = {};
            // itemData['userName'] = this.userName;
           itemDetails['productId'] = --this.productId;
           itemDetails['quantity'] = this.quantity;
           itemDetails['totalCost'] = this.netCost;
           this.dbServiceObj.postItemData(itemDetails).subscribe((resolve) => console.log(resolve));

      }
    }
  }



  enterIntoproject() {
    if (this.userName != null && this.email != null) {
      this.homePageFlag = true;
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
            'email' : this.email,
            'noOfItems' : this.autoIncrement,
            'totalCost': this.netTotal,
            'ItemsList': this.productTable
          }
      };

    if (confirm("Are you sure to proceed!")) {
      this.router.navigate(['successPage'], navigationextras);
    } else {    }
  }

  cancelMethod() {
    this.productTable = [];
    this.addTableFlag = false;
    this.autoIncrement = 0;
    this.netTotal = 0;
  }
}
