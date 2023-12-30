import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularZorroModules } from 'src/app/DemoAngularZorroModules';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCarComponent,
    UpdateCarComponent,
    GetBookingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularZorroModules
  ]
})
export class AdminModule { }
