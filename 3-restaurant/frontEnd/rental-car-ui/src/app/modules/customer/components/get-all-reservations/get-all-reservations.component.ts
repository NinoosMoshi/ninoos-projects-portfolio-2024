import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-get-all-reservations',
  templateUrl: './get-all-reservations.component.html',
  styleUrls: ['./get-all-reservations.component.css']
})
export class GetAllReservationsComponent {

  reservations:any[] = [];

  constructor(private customerService:CustomerService){}


  ngOnInit(){
    this.getReservationByUser();
  }


   getReservationByUser(){
    this.customerService.getReservationsByUser().subscribe(res =>{
      this.reservations = res
    })
   }


}
