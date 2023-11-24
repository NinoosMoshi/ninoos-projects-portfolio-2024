import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { DemoAngularMaterialModules } from 'src/app/DemoAngularMaterialModules';


@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoAngularMaterialModules
  ]
})
export class CustomerModule { }
