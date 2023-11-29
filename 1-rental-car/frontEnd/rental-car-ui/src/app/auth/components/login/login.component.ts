import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSpinning:boolean = false;
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService){}

ngOnInit(){
  this.loginForm = this.fb.group({
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required]]
    })
}



  onSubmit(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;


    this.authService.userActive(email,password).subscribe({
      next:res =>{
        let ac = res.active;
        if(ac == 1){
          this.authService.login(email, password).subscribe({
            next: res =>{
              this.message.success("Login successful", {nzDuration: 5000})
               if(StorageService.isAdminLoggedIn()){
                  this.router.navigateByUrl("/admin/dashboard")
                }
                else if(StorageService.isCustomerLoggedIn()){
                  this.router.navigateByUrl("/customer/dashboard")
                }
            },
            error: err =>{
              this.message.error("Bad credentials.", {nzDuration: 5000})
            }
    })
        }
        else if(ac == 0){
            sessionStorage.setItem("emailAtive",email);
            this.router.navigateByUrl("/active-code")
        }
        else{
          this.message.error("Invalid Credentails", {nzDuration: 5000})
        }

      },
      error:err =>{
        this.message.error("There is something wrong", {nzDuration: 5000})
      }
    })


   }


}
