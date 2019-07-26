import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './search-manager/search-form/search-form.component';
import { WorkFormComponent } from './work-manager/work-form/work-form.component';
import { LoginPageFormComponent } from './login-manager/login-page-form/login-page-form.component';
import { LictDocumentsComponent } from './dialog-windows/list-documents/lict-documents/lict-documents.component';

const routes: Routes = [
  { path: 'login', component: LoginPageFormComponent },
  { path: 'search', component: SearchFormComponent },
  { path: 'mydocs', component: LictDocumentsComponent },
  { path: 'work/:id', component: WorkFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
