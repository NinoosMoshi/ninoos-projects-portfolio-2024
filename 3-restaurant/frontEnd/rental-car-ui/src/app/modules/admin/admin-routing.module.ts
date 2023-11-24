import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const routes: Routes = [
  {path:'dashboard', component:AdminDashboardComponent},
  {path:'category', component:AddCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
