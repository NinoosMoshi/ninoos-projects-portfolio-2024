import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  cars:any = [];

  constructor(private adminService:AdminService,
              private message:NzMessageService){}

  ngOnInit(){
    this.getAllCars();
  }



  getAllCars(){
    this.cars = [];
    this.adminService.getAllCars().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnImage;
        this.cars.push(element);
      });
    })
  }


}
