import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent {

  bookings:any;
  isSpinning:boolean = false;

  constructor(private adminService:AdminService,  private message:NzMessageService){}


  ngOnInit(){
    this.getBookings();
  }

  getBookings(){
    this.isSpinning = true
    this.adminService.getBookings().subscribe({
      next:res =>{
        this.isSpinning = false;
        this.bookings = res;
      },
      error:err =>{
        console.log("the error is: " + err)
      }
    })
  }



  changeBookingStatus(bookingId:number, status:string){
     this.isSpinning = true

     this.adminService.changeBookingStatus(bookingId,status).subscribe({
      next:res =>{
        this.isSpinning = false;
        this.getBookings();
        this.message.success("Booking status changed successfully!", {nzDuration:5000})
      },
      error:err =>{
        this.message.error("Error while Change Booking status", {nzDuration:5000})
      }
     })
  }





}
