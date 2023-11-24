import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DemoAngularMaterialModules } from 'src/app/DemoAngularMaterialModules';


@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoAngularMaterialModules
  ]
})
export class AdminModule { }
