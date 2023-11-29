import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent {

  isSpinning:boolean = false;
  codeForm!: FormGroup;

  email:string = '';


  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private message: NzMessageService){}


  ngOnInit(): void{
    this.codeForm = this.fb.group({
        code:[null, [Validators.required]],
        })

    this.email = sessionStorage.getItem("emailAtive")
  }


  onSubmit(){
      const code = this.codeForm.get('code')?.value;

      this.authService.activeAccount(this.email,code).subscribe({
        next:res =>{
          if(res.result == 1){
            this.router.navigateByUrl("/login");
            this.message.success("Activation Successful", {nzDuration: 5000})
          }else{
            this.message.error("Invalid Code", {nzDuration: 5000})
          }
        },
        error:err =>{
          this.message.error("There is some error", {nzDuration: 5000})
        }
      })

  }

}
