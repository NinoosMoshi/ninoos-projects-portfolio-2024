import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent {

  carId:number = this.activatedRoute.snapshot.params['id'];
  car:any;
  processedImage:any;
  validateForm!:FormGroup;
  isSpinning:boolean = false;
  dateFormat="MM-dd-YYYY";

  constructor(private customerService:CustomerService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private fb:FormBuilder,
              private message:NzMessageService){}


  ngOnInit(){
    this.validateForm = this.fb.group({
      toDate:[null, Validators.required],
      fromDate:[null, Validators.required]
    })
    this.getCarById();
  }


  getCarById(){
    this.customerService.getCarById(this.carId).subscribe({
      next: res=>{
        this.processedImage = 'data:image/jpeg;base64,' + res.returnImage;
        this.car = res;
      },
      error: err =>{
         console.log("error is: " + err.message)
      }
    })
  }


  bookCar(data:any){
    this.isSpinning = true;
    let bookCarDTO = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    }

    this.customerService.bookCarTemp(this.carId,bookCarDTO).subscribe({
      next: res =>{
         console.log(res)
         this.message.success("Booking requesr submitted successfully", {nzDuration:5000})
         this.router.navigateByUrl("/customer/dashboard")
      },
      error: err =>{
        this.message.error("something wen wrong", {nzDuration:5000})
      }
    })
  }



}
