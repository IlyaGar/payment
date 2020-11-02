import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { LoginPageFormComponent } from './login-manager/login-page-form/login-page-form.component';
import { SaldoFormComponent } from './dialog-windows/saldo-manager/saldo-form/saldo-form.component';
import { LictDocumentsComponent } from './dialog-windows/list-documents/lict-documents/lict-documents.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EmptyFormComponent } from './work-manager/empty-form/empty-form.component';
import { ImportFormComponent } from './dialog-windows/import-manager/import-form/import-form.component';
import { DocTabsComponent } from './doc-manager/doc-tabs/doc-tabs.component';
import { DocTableComponent } from './doc-manager/components/doc-table/doc-table.component';
import { NewRowManagerComponent } from './doc-manager/dialog-windows/new-row-manager/new-row-manager.component';
import { DatePipe } from '@angular/common';
import { DateConvertPipe } from './doc-manager/date-convert.pipe';
import { EditRowManagerComponent } from './doc-manager/dialog-windows/edit-row-manager/edit-row-manager.component';
import { InputRowManagerComponent } from './doc-manager/components/input-row-manager/input-row-manager.component';
import { EditRowOfficeComponent } from './doc-manager/dialog-windows/edit-row-office/edit-row-office.component';
import { SelectContragentComponent } from './doc-manager/components/select-contragent/select-contragent.component';
import { SelectContragentDialogComponent } from './doc-manager/dialog-windows/select-contragent-dialog/select-contragent-dialog.component';
import { HistoryDogovorDialogComponent } from './doc-manager/dialog-windows/history-dogovor-dialog/history-dogovor-dialog.component';

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
    LoginPageFormComponent,
    SaldoFormComponent,
    LictDocumentsComponent,
    EmptyFormComponent,
    ImportFormComponent,
    DocTabsComponent,
    DocTableComponent,
    NewRowManagerComponent,
    DateConvertPipe,
    EditRowManagerComponent,
    InputRowManagerComponent,
    EditRowOfficeComponent,
    SelectContragentComponent,
    SelectContragentDialogComponent,
    HistoryDogovorDialogComponent,
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
    MatNativeDateModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
  ],
  providers: [
    HttpClient,
    CookieService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' },
  ],
  entryComponents: [
    SaveFormComponent,
    PartnerListComponent, 
    OrderListComponent,
    LoginFormComponent,
    CreateDocumComponent,
    DetailPartnerFormComponent,
    AttentionFormComponent,
    SaldoFormComponent,
    ImportFormComponent,
    NewRowManagerComponent,
    EditRowOfficeComponent,
    EditRowManagerComponent,
    SelectContragentDialogComponent,
    HistoryDogovorDialogComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }