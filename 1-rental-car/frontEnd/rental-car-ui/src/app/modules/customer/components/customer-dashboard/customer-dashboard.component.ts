import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {

  cars:any = [];
  isSpinning:boolean = false;


  constructor(private customerService:CustomerService,
    private message:NzMessageService,
    private router:Router){}

  ngOnInit(){
    this.getAllCars();
  }



  getAllCars(){
    this.cars = [];
    this.customerService.getAllCars().subscribe(res =>{
       res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnImage;
          this.cars.push(element);
       });
    })
  }




}
