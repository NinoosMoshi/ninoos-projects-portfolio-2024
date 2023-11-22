import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  products:any[] = [];
  searchProductForm!:FormGroup


  constructor(private adminService: AdminService,private fb:FormBuilder){}


  ngOnInit():void{
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title:[null, [Validators.required]]
      })
  }


  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }




  submitForm(){
    const title = this.searchProductForm.get('title')?.value;
    this.products = [];
    this.adminService.getAllProductsByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }



  deleteProduct(productId:number){
     this.adminService.deleteProduct(productId).subscribe(res =>{
        console.log(res)
        this.getAllProducts();
     })
  }




}
