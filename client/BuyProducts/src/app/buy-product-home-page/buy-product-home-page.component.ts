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
      
      .search{
        background-color: blanchedalmond;
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

  constructor(private dbServiceObj: DatabasedataService, private router:Router,
              private activatedRoute: ActivatedRoute, private localStorage: LocalStorage) { }

  addTableFlag = false;
  buyProductFlag = false;
  addProductObjectFlag  = true;

  userName: string;
  email: string;
  productId: number;
  productDescription: string;

  searchProducts = "";
  billId: number;
  productTable = [] ;
  listOfItemsDetails = [];
  productData = [] ;
  productName: string;
  productCategory: string;
  page: any;                    // Page contains pageNo, itemsPerPage, search
  pageNo = 1;
  total: number;
  searchPrdFromDb = {price: '', category: '', name: '' };          // searchPrdFromDb --> search Products from Database


  productCost = 0;
  netCost = 0;
  autoIncrement = 0;
  netTotal = 0;
  quantity = 0;
  itemsPerPage = 10;



  ngOnInit() {
    this.getUserDetails();
    this.activatedRoute.params.subscribe((params) => {
            // Once customer clicks BuyProduct from HeaderComponent, This should activate
      if(params.buyProductsId == 1) {
        this.buyProductFlag = true;
      }
    });

   this.getProductDetailsPaginationSearch(1);       // Calling Product Data having pagination with default pageNo set to 1
  }

  getUserDetails(){
    this.localStorage.getItem('user').subscribe((customer) => {
      console.log("customer:", customer);
      this.userName = customer.userName;
      this.email = customer.email;
    })
  }


  getProductDetailsPaginationSearch(pageNumber) {
    this.pageNo = pageNumber;
    this.page = { pageNo: this.pageNo, itemsPerPage: this.itemsPerPage, searchAll: this.searchProducts };
    this.dbServiceObj.getProductDataWithPageAndSearch(this.page).subscribe((response) => {
      this.productData = response.rows;
      this.total=response.count;
    });
  }


  getProductsByIndividualFields(pageNumber) {
    this.pageNo = pageNumber;
    this.page = { pageNo: this.pageNo, itemsPerPage: this.itemsPerPage, searchAll: this.searchPrdFromDb };
    this.dbServiceObj.getProductsByIndividualFields(this.page).subscribe((response) => {
      this.productData = response.rows;
      this.total=response.count;
    });
  }


  // Displaying Selected items list as a table
  // total : total qauntity cost
  // netTotal: Total of all the ItemsCost
  // productCost: Cost of one Product:

  //This method will be called Once 'add into product' button clicks
  addProduct(){
    this.netCost = this.productCost * this.quantity;
    this.netTotal = this.netTotal + this.netCost;
    for(let i=0; i< this.productTable.length; i++) {
        if (this.productName === this.productTable[i].productName) {  // Checking whether the entered Product present in the array or not
          let num1 = parseInt(this.productTable[i].quantity);
          let num2 = parseInt(String(this.quantity));
          this.productTable[i].quantity = num1 + num2;                // adding quantity to already existing product quantity
          this.productTable[i].netCost = parseInt(this.productTable[i].netCost) + this.netCost;
                                                                      // adding netCost to already existing product netCost
          this.addProductObjectFlag = false;     // If same item not selected, then the item details should add into PRODUCTTABLE array
          break;
        }
    }
    if(this.addProductObjectFlag){
        let productObject = {};
        productObject['id'] = this.productId;
        productObject['productName'] =  this.productName;
        productObject['itemCost'] = this.productCost;
        productObject['category'] = this.productCategory;
        productObject['quantity'] = this.quantity;
        productObject['netCost'] = this.netCost;
        this.productTable.push(productObject);
        this.addTableFlag = true;       // Enables selected ItemsList Table
        this.autoIncrement++;
    }
    this.addProductObjectFlag = true;
    let itemDetails = {};
    itemDetails['productId'] = this.productId;
    itemDetails['productName'] = this.productName;
    itemDetails['quantity'] = this.quantity;
    itemDetails['totalCost'] = this.netCost;
    this.listOfItemsDetails.push(itemDetails);

    this.dbServiceObj.setProductTableData(this.productTable);
  }




  // Gathering all the information related to One product choosen by Customer
  productDetails(product) {
    this.productId = product.id;
    this.productName = product.name;
    this.productCost = product.price;
    this.productCategory = product.category;
    this.productDescription = product.description;
    this.quantity = 0;
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
        this.listOfItemsDetails.splice(i,1);
        --this.autoIncrement;
        this.netTotal = this.netTotal - item.netCost;
      }
    }
    if(this.productTable.length==0){
      this.addTableFlag = false;
    }
  }



  addQuantity(){                  // + button for adding quantity
    this.quantity = this.quantity +1;
  }


  subQuantity(){                 // + button for adding quantity
    if(this.quantity != 0)
      this.quantity = this.quantity - 1;
  }

}
