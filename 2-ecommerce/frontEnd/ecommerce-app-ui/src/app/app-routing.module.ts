import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeActivationComponent } from './auth/components/code-activation/code-activation.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { accountGuard } from './auth/services/canActive/account.guard';
import { loginGuard } from './auth/services/canActive/login.guard';

const routes: Routes = [
  {path:'reset', component:ResetPasswordComponent},
  { path:'active-code', component:CodeActivationComponent, canActivate:[accountGuard]},
  {path:'register', component:SignupComponent, canActivate:[loginGuard]},
  {path:'login', component:LoginComponent, canActivate:[loginGuard]},

  {path:'admin', loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path:'customer', loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
