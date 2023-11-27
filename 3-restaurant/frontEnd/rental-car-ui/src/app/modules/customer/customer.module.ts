import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { DemoAngularMaterialModules } from 'src/app/DemoAngularMaterialModules';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { PostReservationComponent } from './components/post-reservation/post-reservation.component';
import { GetAllReservationsComponent } from './components/get-all-reservations/get-all-reservations.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    ViewProductsComponent,
    PostReservationComponent,
    GetAllReservationsComponent
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
