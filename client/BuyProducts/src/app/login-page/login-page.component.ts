import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabasedataService} from "../databasedata.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
    `
      .table {
        margin: auto;
        width: 50% !important;
      }
      
      .h1 {
        background-color: orchid;
      }
    `
  ]
})
export class LoginPageComponent implements OnInit {
  angForm: FormGroup;
  constructor(private router:Router,private dbServiceObj: DatabasedataService, private fb: FormBuilder) { }
  userName: string;
  email: string;
  ngOnInit() {
    this.formSubmission();
  }

  enterIntoproject() {
    if (this.userName != null && this.email != null && this.userName.match('[a-zA-Z0-9]')) {
      let customerDetails = {userName: this.userName, email: this.email};
      this.dbServiceObj.setUserDetails(customerDetails);
      this.router.navigate(['/']);
    }
  }

  formSubmission() {
    this.angForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }
}
