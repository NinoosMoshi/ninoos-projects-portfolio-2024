import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';

const routes: Routes = [
  {path:'dashboard', component:AdminDashboardComponent},
  {path:'category', component:AddCategoryComponent},
  {path:':categoryId/product', component:PostProductComponent},
  {path:':categoryId/products', component:ViewProductsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
