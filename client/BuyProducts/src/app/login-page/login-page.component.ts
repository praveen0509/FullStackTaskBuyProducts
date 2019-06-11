import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabasedataService} from "../databasedata.service";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
    `      
    input{
          background-color: #ff80ab;
      }
      label{
        font-family: "Noto Sans CJK JP Bold";
      }
      
      h6 {
        padding: 0%;
      }
    `
  ]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router:Router,private dbServiceObj: DatabasedataService, private fb: FormBuilder, private localStorage: LocalStorage) {
    this.loginFormSubmission();
  }
  userName: string;
  email: string;
  ngOnInit() {
  }

  enterIntoproject() {
    console.log(this.userName, this.email);
    if (this.userName != null && this.email != null && this.userName.match('[a-zA-Z0-9]')) {
      let customerDetails = {userName: this.userName, email: this.email};
      console.log("customer Details:", customerDetails);
      this.localStorage.setItem('user', customerDetails).subscribe(() => { });
      this.router.navigate(['/']);
    }
  }

  loginFormSubmission() {
    this.loginForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }
}
