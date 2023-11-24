import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterialModules } from 'src/app/DemoAngularMaterialModules';


@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DemoAngularMaterialModules
  ]
})
export class CustomerModule { }
