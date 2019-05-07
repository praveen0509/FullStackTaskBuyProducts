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

      .table {
        text-align: center;
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
  buyProductFlag = false;
  displayProductDataFlag = false;
  productFilter = { name: ''};
  userName: string;
  email: string;


  selectedItemsList: any;
  displayRowPagination: number = 5;
  tableDataFlag = false;
  searchByName = {purchasedBy : '', id: '', purchasedOn:''};
  paginationOptions = [5,6,7,8,9,10];
  billDBData: any;

  productId: number;
  billId = 1;

  productTable = [] ;
  listOfItemsDetails = [];
  databaseData: any ;
  productName: string;
  productCategory: string;

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

    this.dbServiceObj.getBillData().subscribe((resolve) => {
      this.billDBData = resolve;
    });
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
        this.addTableFlag = true;       // Enables selected ItemsList Table
        const productObject = {};
        productObject['id'] = ++this.autoIncrement;
        productObject['productName'] =  this.productFilter.name;
        productObject['itemCost'] = this.productCost;
        productObject['quantity'] = this.quantity;
        productObject['netCost'] = this.netCost;
        this.productTable.push(productObject);

        let itemDetails = {};
        itemDetails['productId'] = this.productId;
        itemDetails['quantity'] = this.quantity;
        itemDetails['totalCost'] = this.netCost;
        this.listOfItemsDetails.push(itemDetails);
        console.log(this.listOfItemsDetails);
        this.productFilter.name = '';
        this.quantity = 1;
      }
    }
  }


  selectQuantity(id: number) {
    this.quantity = id;
  }

  productDetails(product) {
    this.productCost = product.price;
    this.productId = product.id;
    this.productName = product.name;
    this.productCategory = product.category;
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
    ++this.billId;
    this.dbServiceObj.bulkPostItemData(this.listOfItemsDetails, this.billId).subscribe((response) => console.log(response));
    this.dbServiceObj.postBillData(billDetails, this.billId).subscribe((response) => console.log(response));
    this.router.navigate(['successPage'], navigationextras);
  }

  cancelMethod() {
    this.productTable = [];
    this.addTableFlag = false;
    this.autoIncrement = 0;
    this.netTotal = 0;
  }

  removeDataFromTable(item) {
    console.log(this.productTable[0], item);
    for( let i=0; i< this.productTable.length; i++) {
      if(this.productTable[i].productName === item.productName){
        this.productTable.splice(i,1);
        --this.autoIncrement;
        this.netTotal = this.netTotal - item.netCost;
      }
    }
  }

}
