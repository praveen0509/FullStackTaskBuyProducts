import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styles: [
    `
      .container {
        position: absolute;
        top: 40%;
        left: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn {
        position: absolute;
        top: 90%;
        left: 40%;
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
