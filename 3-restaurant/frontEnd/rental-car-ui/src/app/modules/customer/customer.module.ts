import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { DemoAngularMaterialModules } from 'src/app/DemoAngularMaterialModules';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewProductsComponent } from './components/view-products/view-products.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoAngularMaterialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
