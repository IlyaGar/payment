import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './search-manager/search-form/search-form.component';
import { WorkFormComponent } from './work-manager/work-form/work-form.component';


const routes: Routes = [
  { path: 'search', component: SearchFormComponent },
  { path: 'work/:id', component: WorkFormComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
