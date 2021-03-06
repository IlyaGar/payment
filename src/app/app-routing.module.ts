import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './search-manager/search-form/search-form.component';
import { WorkFormComponent } from './work-manager/work-form/work-form.component';
import { LoginPageFormComponent } from './login-manager/login-page-form/login-page-form.component';
import { LictDocumentsComponent } from './dialog-windows/list-documents/lict-documents/lict-documents.component';
import { EmptyFormComponent } from './work-manager/empty-form/empty-form.component';
import { DocTabsComponent } from './doc-manager/doc-tabs/doc-tabs.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'login', component: LoginPageFormComponent },
  { path: 'search', component: SearchFormComponent },
  { path: 'mydocs', component: LictDocumentsComponent },
  { path: 'work/:id', component: WorkFormComponent },
  { path: 'doc-tabs', component: DocTabsComponent },
  { path: 'empty', component: EmptyFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
