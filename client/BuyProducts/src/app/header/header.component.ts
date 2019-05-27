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
      
     #nav .btn{
       color: orchid;
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
