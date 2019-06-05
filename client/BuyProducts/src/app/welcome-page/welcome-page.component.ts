import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styles: [
    `
      .container{
        position: absolute;
        top: 45%;
        left: 35%;
      }
    `
  ]
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoLoginPage(){
    this.router.navigate(['/loginPage']);
  }

}
