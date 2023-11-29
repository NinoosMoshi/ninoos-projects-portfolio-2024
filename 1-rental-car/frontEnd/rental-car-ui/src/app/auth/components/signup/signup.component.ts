import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  isSpinning:boolean = false;
  signupForm!: FormGroup;



  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService){}


ngOnInit(): void{
  this.signupForm = this.fb.group({
      name:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]],
      checkPassword:[null, [Validators.required, this.confirmationValidate]]
      })
}

confirmationValidate = (control:FormControl):{ [s:string]: boolean } =>{
  if(!control.value) {
    return {require:true};
  }
  else if(control.value !== this.signupForm.controls['password'].value){
    return { confirm:true, error:true};
  }
  return {};
}


    register(){
      const email = this.signupForm.get('email')?.value;
      this.authService.register(this.signupForm.value).subscribe({
        next:res =>{
          if(res.result == 1){
            sessionStorage.setItem("emailAtive",email);
            this.message.success("Signup successful", {nzDuration: 5000})
            this.router.navigateByUrl("/active-code")
          }else{
            this.message.error("Email Is Exists", {nzDuration: 5000})
          }

        },
        error:err =>{
          this.message.error("Sign up faild. Please try again.", {nzDuration: 5000})
        }
      })



    }

}
