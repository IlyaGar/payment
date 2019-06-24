import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-manager/search-form/search-form.component';
import { NgxPaginationModule}  from  'ngx-pagination' ; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { WorkFormComponent } from './work-manager/work-form/work-form.component';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './models/material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarFormComponent } from './navbar-form/navbar-form/navbar-form.component';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';
import { OrderListComponent } from './order-manager/order-list/order-list.component';
import { CookieService } from 'ngx-cookie-service';


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
    MatNativeDateModule
  ],
  providers: [
    HttpClient,
    CookieService
  ],
  entryComponents: [
    WorkFormComponent, 
    PartnerListComponent, 
    OrderListComponent,
    LoginFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
