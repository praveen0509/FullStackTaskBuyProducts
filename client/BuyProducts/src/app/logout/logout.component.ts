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
    this.localStorage.removeItem('userName');
    this.localStorage.removeItem('email');
    this.router.navigate(['/loginPage']);
  }

}
