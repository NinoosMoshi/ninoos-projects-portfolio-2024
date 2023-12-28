import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent {

  bookings:any;
  isSpinning:boolean = false;

  constructor(private customerService:CustomerService){}

  ngOnInit(){
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true
    this.customerService.getBookingsByUserId().subscribe({
      next:res =>{
        console.log(res)
        this.isSpinning = false;
        this.bookings = res
      },
      error:err =>{
        console.log("the error is: " + err)
      }
    })
  }



}
