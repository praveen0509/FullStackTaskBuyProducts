import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatabasedataService} from "../databasedata.service";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: [`
    
  `]
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(private router: Router,private localStorage: LocalStorage) { }

  ngOnInit() {
    this.router.navigate(['/loginPage']);
  }

  ngOnDestroy() {
    this.localStorage.clear();
  }

}
