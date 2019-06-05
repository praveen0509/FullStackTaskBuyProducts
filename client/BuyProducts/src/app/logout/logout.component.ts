import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabasedataService} from "../databasedata.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private dbServiceObj: DatabasedataService) { }

  ngOnInit() {
    this.router.navigate(['/loginPage']);
  }

}
