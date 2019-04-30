import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorage) { }

  ngOnInit() {
    alert('You logged out from this page');
    alert('Please login to continue...');
    this.localStorage.getItem('key').subscribe((customerDetails) => {
      customerDetails.userName = null;
      customerDetails.email = null;
    })
    this.router.navigate(['/loginPage']);
  }

}
