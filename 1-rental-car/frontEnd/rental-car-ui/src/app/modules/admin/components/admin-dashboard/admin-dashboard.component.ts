import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  cars:any = [];
  isSpinning:boolean = false;

  constructor(private adminService:AdminService,
              private message:NzMessageService,
              private router:Router){}

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





  deleteCar(id:number){
    this.adminService.deleteCar(id).subscribe({
      next:res =>{
        this.getAllCars()
        this.isSpinning = false
        this.message.success("Car Deleted successfully", {nzDuration:5000})
        this.router.navigateByUrl("/admin/dashboard")
      },
      error:err =>{
        this.message.error("Error while delete a car", {nzDuration:5000})
      }
     })
  }


}
