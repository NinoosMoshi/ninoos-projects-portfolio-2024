import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent {

   isSpinning:boolean = false;

   carId:number = this.activatedRoute.snapshot.params['id'];

  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private message:NzMessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute){}




ngOnInit(){
  this.getCarById();
}


getCarById(){
   this.adminService.getCarById(this.carId).subscribe({
    next:res =>{
      this.isSpinning = false
      this.message.success("Get Car successfully", {nzDuration:5000})
      console.log(res)
    },
    error:err =>{
      this.message.error("Error while getting car", {nzDuration:5000})
    }
   })
}


}
