import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AppComponent } from './app.component';
import { BuyProductHomePageComponent } from './buy-product-home-page/buy-product-home-page.component';
import { FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule, MatInputModule} from '@angular/material';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { SampleTestingPageComponent } from './sample-testing-page/sample-testing-page.component';
import {HttpClientModule} from "@angular/common/http";
import {QueryApi} from "./commonServices/request/QueryApi";
import { LoginPageComponent } from './login-page/login-page.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LogoutComponent } from './logout/logout.component';
import {NgxPaginationModule} from "ngx-pagination";
import {NgFlashMessagesModule} from "ng-flash-messages";
import {FlashMessagesModule} from "ngx-flash-messages";
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyProductHomePageComponent,
    HeaderComponent,
    FooterComponent,
    SuccessMessageComponent,
    SampleTestingPageComponent,
    LoginPageComponent,
    WelcomePageComponent,
    LogoutComponent,
    PreviousOrdersComponent,
    CustomerDetailsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FilterPipeModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    NgFlashMessagesModule.forRoot(),
    FlashMessagesModule,
    RouterModule.forRoot([
      { path: 'successPage', component: SuccessMessageComponent },
      { path: '', component: WelcomePageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'buyProductsPage', component: BuyProductHomePageComponent},
      { path: 'buyProductsPage/:buyProductsId', component: BuyProductHomePageComponent },
      { path: 'loginPage', component: LoginPageComponent },
      { path: 'logoutPage', component: LogoutComponent },
      { path: 'previousOrders', component: PreviousOrdersComponent },
      { path: 'customerDetails/:customerId', component: CustomerDetailsComponent },
      { path: '**', redirectTo: '/previousOrders', pathMatch: 'full' }

    ])
  ],
  providers: [QueryApi],
  bootstrap: [AppComponent],

})
export class AppModule { }
