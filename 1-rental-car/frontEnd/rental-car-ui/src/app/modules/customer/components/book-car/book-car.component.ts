import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent {

  carId:number = this.activatedRoute.snapshot.params['id'];
  car:any;
  processedImage:any;

  constructor(private customerService:CustomerService,
              private router:Router,
              private activatedRoute:ActivatedRoute){}


  ngOnInit(){
    this.getCarById();
  }


  getCarById(){
    this.customerService.getCarById(this.carId).subscribe({
      next: res=>{
        console.log(res)
        this.processedImage = 'data:image/jpeg;base64,' + res.returnImage;
        this.car = res;
      },
      error: err =>{
         console.log("error is: " + err.message)
      }
    })
  }



}
