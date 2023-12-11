import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
   carForm!:FormGroup;
   existingImage:string | null = null;
   listOfOption: Array<{label:string; value:string}> = [];
   listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
   listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];
   listOfColor = ['Red', 'White', 'Blue', 'Black'];
   listOfTransmission = ['Manual', 'Automatic'];

   carId:number = this.activatedRoute.snapshot.params['id'];


  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private message:NzMessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute){}




ngOnInit(){
  this.carForm = this.fb.group({
    brand:[null, Validators.required],
    name:[null, Validators.required],
    type:[null, Validators.required],
    transmission:[null, Validators.required],
    color:[null, Validators.required],
    date:[null, Validators.required],
    price:[null, Validators.required],
    description:[null, Validators.required]
  })
  this.getCarById();
}


getCarById(){
  this.isSpinning = true
   this.adminService.getCarById(this.carId).subscribe({
    next:res =>{
      this.isSpinning = false
      this.message.success("Get Car successfully", {nzDuration:5000})
      const carDTO = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnImage;
      this.carForm.patchValue(carDTO);

    },
    error:err =>{
      this.message.error("Error while getting car", {nzDuration:5000})
    }
   })
}





}
