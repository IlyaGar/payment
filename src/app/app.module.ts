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
  ],
  providers: [
    HttpClient,
    CookieService
  ],
  entryComponents: [
    //WorkFormComponent, 
    PartnerListComponent, 
    OrderListComponent,
    LoginFormComponent,
    CreateDocumComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }