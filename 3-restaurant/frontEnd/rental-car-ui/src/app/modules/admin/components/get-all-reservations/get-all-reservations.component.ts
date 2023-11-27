import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-get-all-reservations',
  templateUrl: './get-all-reservations.component.html',
  styleUrls: ['./get-all-reservations.component.css']
})
export class GetAllReservationsComponent {

  reservations:any[] = [];

  constructor(private adminService:AdminService){}


  ngOnInit(){
    this.getReservationsByAdmin();
  }


   getReservationsByAdmin(){
    this.adminService.getAllReservations().subscribe(res =>{
      this.reservations = res
    })
   }



   changeReservationStatus(reservationId:number, status:string){
       console.log(reservationId)
       console.log(status)
       this.adminService.changeReservationStatus(reservationId, status).subscribe(res =>{
        console.log(res)
        if(res.id != null){
          this.getReservationsByAdmin();
        }
       })
   }


}
