import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  isSpinning:boolean = false;
  emailForm!: FormGroup;
  resetForm!: FormGroup;

  enableFrom: boolean = true;


  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private message: NzMessageService){}


  ngOnInit(): void{
    this.emailForm = this.fb.group({
        email:[null, [Validators.required, Validators.email]],
        })

    this.resetForm = this.fb.group({
        code:[null, [Validators.required]],
        password:[null, [Validators.required]],
        checkPassword:[null, [Validators.required, this.confirmationValidate]]
        })
  }


  confirmationValidate = (control:FormControl):{ [s:string]: boolean } =>{
    if(!control.value) {
      return {require:true};
    }
    else if(control.value !== this.resetForm.controls['password'].value){
      return { confirm:true, error:true};
    }
    return {};
  }



  onSubmitEmail(){
     const email = this.emailForm.get('email')?.value;

     this.authService.checkEmail(email).subscribe({
      next:res =>{
        if(res.result == 1){
          this.enableFrom = false;
        }
      },
      error:err =>{
        this.message.error("Email is not Exists.", {nzDuration: 5000})
      }
     })

   }




  onSubmitReset(){

    const email = this.emailForm.get('email')?.value;
    const code = this.resetForm.get('code')?.value;
    const password = this.resetForm.get('password')?.value;
    const checkPassword = this.resetForm.get('checkPassword')?.value;

    if(password !== checkPassword){
      this.message.error("Passwords do not matched.", {nzDuration: 5000})
      return;
    }

    this.authService.resetPassword(email, password, code).subscribe({

      next:res =>{
        if(res.result == 1){
           this.router.navigateByUrl("/login")
        }
      },
      error:err =>{
        this.message.error("Invalid Code.", {nzDuration: 5000})
      }
    })



   }



}
