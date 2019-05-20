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

      .split {
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 8%;
        overflow-x: hidden;
        padding-top: 20px;
      }

      .left {
        width: 20%;
        left: 0;
      }

      .right {
        width: 80%;
        right: 0;
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
  productObjectFlag = true;
  addProductObjectFlag  = true;

  productFilter = { name: ''};
  userName: string;
  email: string;
  productId: number;

  searchProducts = "";
  billId: number;
  productTable = [] ;
  listOfItemsDetails = [];
  productData: any ;
  productName: string;
  productCategory: string;
  page: any;                    // Page contains pageNo, itemsPerPage, search
  pageNo = 1;
  total: number;

  options = [1, 2, 3, 4, 5];
  productCost = 0;
  netCost = 0;
  autoIncrement = 0;
  netTotal = 0;
  quantity = 1;
  itemsPerPage = 6;



  ngOnInit() {
    this.localStorage.getItem('key').subscribe((customerDetails)=>{
      this.userName = customerDetails.userName;
      this.email = customerDetails.email;
    })

    this.activatedRoute.params.subscribe((params) => {
      if(params.buyProductsId == 1) {
        this.buyProductFlag = true;
      }
    });

   this.getProductDetailsPaginationSearch(1);       // Calling Product Data having pagination with default pageNo set to 1
  }

  getProductDetailsPaginationSearch(pageNumber) {
    this.pageNo = pageNumber;
    this.page = { pageNo: this.pageNo, itemsPerPage: this.itemsPerPage, search: this.searchProducts };
    this.dbServiceObj.getProductDataWithPageAndSearch(this.page).subscribe((response) => {
      this.productData = response.rows;
      this.total=response.count;
      console.log("productData:", this.productData);
    });
  }


  // Displaying Selected items list as a table
  addProduct() {
    for (let i = 0; i < this.productData.length; i++) {
      // total : total qauntity cost
      // netTotal: Total of all the ItemsCost
      // productCost: Cost of one Product:
      if (this.productFilter.name === this.productData[i].name) {
        this.netCost = this.productCost * this.quantity;
        this.netTotal = this.netTotal + this.netCost;
        this.addTableFlag = true;       // Enables selected ItemsList Table


        if(this.productObjectFlag) {   // executes First time Only, to save Object into productTable array
          const productObject = {};
          productObject['id'] = ++this.autoIncrement;
          productObject['productName'] =  this.productFilter.name;
          productObject['itemCost'] = this.productCost;
          productObject['quantity'] = this.quantity;
          productObject['netCost'] = this.netCost;
          this.productTable.push(productObject);   //pushing objects into productTable array
          this.productObjectFlag = false;
        }

        else{
          for(let i=0; i< this.productTable.length; i++) {
            if(this.productFilter.name===this.productTable[i].productName){  // Checking whether the entered Product present in the array or not
              let num1 = parseInt(this.productTable[i].quantity);
              let num2 = parseInt(String(this.quantity));
              this.productTable[i].quantity = num1 + num2;  // adding quantity to already existing product quantity
              this.productTable[i].netCost = parseInt(this.productTable[i].netCost) + this.netCost; // adding netCost to already existing product netCost
              this.addProductObjectFlag = false;
              break;
            }
          }

          if(this.addProductObjectFlag) {
            const productObject = {};
            productObject['id'] = ++this.autoIncrement;
            productObject['productName'] =  this.productFilter.name;
            productObject['itemCost'] = this.productCost;
            productObject['quantity'] = this.quantity;
            productObject['netCost'] = this.netCost;
            this.productTable.push(productObject);
          }
          this.addProductObjectFlag = true;
        }


        let itemDetails = {};
        itemDetails['productId'] = this.productId;
        itemDetails['productName'] = this.productName;
        itemDetails['quantity'] = this.quantity;
        itemDetails['totalCost'] = this.netCost;
        this.listOfItemsDetails.push(itemDetails);
        this.productFilter.name = '';
        this.quantity = 1;
      }
    }
  }


  // Getting Quantity information about an Item
  selectQuantity(id: number) {
    this.quantity = id;
  }

  // Gathering all the information related to One product choosen by Customer
  productDetails(product) {
    this.productId = product.id;
    this.productName = product.name;
    this.productCost = product.price;
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

    this.dbServiceObj.postBillData(billDetails).subscribe((params) => {  // Sending Object to Bill Model
      console.log("params:", params.id);
      this.billId = params.id;
      this.dbServiceObj.bulkPostItemData(this.listOfItemsDetails, this.billId).subscribe((res) => {});
      this.router.navigate(['successPage']);
    });                                             // Sending Object Array  Data To Items Model

  }

  cancelMethod() {
    this.productTable = [];
    this.addTableFlag = false;
    this.autoIncrement = 0;
    this.netTotal = 0;
  }

  removeDataFromTable(item) {
    for( let i=0; i< this.productTable.length; i++) {
      if(this.productTable[i].productName === item.productName){
        this.productTable.splice(i,1);
        --this.autoIncrement;
        this.netTotal = this.netTotal - item.netCost;
      }
    }
  }


  addQuantity(){
    this.quantity = this.quantity +1;
  }

  subQuantity(){
    if(this.quantity != 0)
      this.quantity = this.quantity - 1;
  }

}
