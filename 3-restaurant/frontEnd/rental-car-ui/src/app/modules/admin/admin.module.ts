import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DemoAngularMaterialModules } from 'src/app/DemoAngularMaterialModules';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostProductComponent } from './components/post-product/post-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddCategoryComponent,
    PostProductComponent,
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoAngularMaterialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
