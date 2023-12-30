import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent {

  bookings:any;
  isSpinning:boolean = false;

  constructor(private adminService:AdminService){}


  ngOnInit(){
    this.getBookings();
  }

  getBookings(){
    this.isSpinning = true
    this.adminService.getBookings().subscribe({
      next:res =>{
        this.isSpinning = false;
        console.log(res)
        this.bookings = res;
      },
      error:err =>{
        console.log("the error is: " + err)
      }
    })
  }


}
