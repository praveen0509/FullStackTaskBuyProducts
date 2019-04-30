import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
    `
      .table {
        margin: auto;
        width: 50% !important;
      }
    `
  ]
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router, private localStorage: LocalStorage) { }
  userName: string;
  email: string;


  ngOnInit() {
  }

  enterIntoproject() {
    if (this.userName != null && this.email != null) {
      let customerDetails = {userName: this.userName, email: this.email};
      this.localStorage.setItem('key', customerDetails).subscribe(()=> {});
      this.router.navigate(['/buyProductsPage']);
    }
  }

}
