import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-manager/search-form/search-form.component';
import { NgxPaginationModule}  from  'ngx-pagination' ; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { WorkFormComponent } from './work-manager/work-form/work-form.component';
import { PartnerListComponent } from './partner-manager/partner-list/partner-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './models/material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarFormComponent } from './navbar-form/navbar-form/navbar-form.component';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';
import { OrderListComponent } from './order-manager/order-list/order-list.component';
import { CookieService } from 'ngx-cookie-service';
import { CreateDocumComponent } from './work-manager/create-docum/create-docum.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { SaveFormComponent } from './dialog-windows/save-manager/save-form/save-form.component';
import { DetailPartnerFormComponent } from './dialog-windows/detail-partner-view/detail-partner-form/detail-partner-form.component';
import { NgxCurrencyModule } from "ngx-currency";
import { AttentionFormComponent } from './dialog-windows/dialog-attention/attention-form/attention-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    AdminComponent,
    WorkFormComponent,
    PartnerListComponent,
    OrderListComponent,
    LoginFormComponent,
    NavbarFormComponent,
    CreateDocumComponent,
    PartnerListComponent,
    SaveFormComponent,
    DetailPartnerFormComponent,
    AttentionFormComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    DemoMaterialModule,
    MatNativeDateModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  providers: [
    HttpClient,
    CookieService
  ],
  entryComponents: [
    SaveFormComponent,
    PartnerListComponent, 
    OrderListComponent,
    LoginFormComponent,
    CreateDocumComponent,
    DetailPartnerFormComponent,
    AttentionFormComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }