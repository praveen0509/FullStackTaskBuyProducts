import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabasedataService} from "../databasedata.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
    .a {
      color: white;
    }

    ul li div button{
       color:orchid;
     }     
     ul{
       float: right;
     }
     
     ul li{
       display: inline-block;
     }
      
      ul li button{
        color: blanchedalmond;
      }
    `
  ]
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private dbServiceObj: DatabasedataService) { }

  databaseData: any;
  buyProductsId = 0;
  myCartFlag = false;

  ngOnInit() {
        this.dbServiceObj.getProductData().subscribe((resolve) => {
        this.databaseData = resolve;
    });
  }

  buyProductSendData(){
    this.buyProductsId = 1;
    this.router.navigate(['/buyProductsPage', this.buyProductsId] );
  }


}
