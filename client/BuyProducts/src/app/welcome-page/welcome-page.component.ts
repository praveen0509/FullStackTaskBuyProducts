import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styles: [
    `
      body .container{
        position: absolute;
        top: 45%;
        left: 35%;
      }
      
      body{
        position: fixed;
        min-width: 100%;
        min-height: 100%;
        /*background-image: url("https://cdn.corporate.walmart.com/dims4/WMT/51b398e/2147483647/crop/1920x960%2B0%2B120/resize/1300x650%3E/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2F24%2F47%2Ffa82f1d843f1a41bfa045c9b68fc%2F13.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;*/
      }
    `
  ]
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("Welcome Page");
  }

  gotoLoginPage(){
    this.router.navigate(['/loginPage']);
  }

}
