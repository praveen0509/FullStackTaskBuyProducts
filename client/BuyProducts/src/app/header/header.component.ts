import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatabasedataService} from "../databasedata.service";
import {LocalStorage} from "@ngx-pwa/local-storage";

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
  constructor(private router: Router, private dbServiceObj: DatabasedataService, private localStorage: LocalStorage) { }

  databaseData: any;
  userData = {userName: '', email: ''};
  buyProductsId = 0;
  myCartFlag = false;

  ngOnInit() {
      this.dbServiceObj.getProductData().subscribe((resolve) => {
          console.log(resolve);
        this.databaseData = resolve;
      });

    // getting user details from local storage
    this.localStorage.getItem('user').subscribe((customer) => {
      this.userData['userName'] = customer['userName'];
      this.userData['email'] = customer['email'];
      console.log("customer:",this.userData);
    })
  }

  buyProductSendData(){
    this.buyProductsId = 1;
    this.router.navigate(['/buyProductsPage', this.buyProductsId] );
  }


}
