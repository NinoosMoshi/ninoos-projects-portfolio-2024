import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {

  products:any[] = [];
  searchProductForm!:FormGroup


  constructor(private customerServive: CustomerService,private fb:FormBuilder){}


  ngOnInit():void{
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title:[null, [Validators.required]]
      })
  }


  getAllProducts(){
    this.products = [];
    this.customerServive.getAllProducts().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }


  submitForm(){
    const title = this.searchProductForm.get('title')?.value;
    this.products = [];
    this.customerServive.getAllProductsByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }



  addToCart(id:number){
     this.customerServive.addToCart(id).subscribe(res =>{
       console.log("added successfully")
     })
  }


}
