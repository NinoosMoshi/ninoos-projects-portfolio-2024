import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { PostReservationComponent } from './components/post-reservation/post-reservation.component';
import { GetAllReservationsComponent } from './components/get-all-reservations/get-all-reservations.component';

const routes: Routes = [
  {path:'dashboard', component:CustomerDashboardComponent},
  {path:':categoryId/products', component:ViewProductsComponent},
  {path:'reservation', component:PostReservationComponent},
  {path:'reservations', component:GetAllReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
