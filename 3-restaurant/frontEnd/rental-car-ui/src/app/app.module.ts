import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModules } from './DemoAngularMaterialModules';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { CodeActivationComponent } from './auth/components/code-activation/code-activation.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


// note: npm install ngx-material-timepicker --save    for time picker



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CodeActivationComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModules,
    NgxMaterialTimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
