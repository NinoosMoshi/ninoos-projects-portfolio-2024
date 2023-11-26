import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {

  categories:any[] = [];
  searchCategoryForm!:FormGroup

  constructor(private customerService: CustomerService,private fb:FormBuilder){}


  ngOnInit():void{
    this.getAllCategories();
    this.searchCategoryForm = this.fb.group({
      title:[null, [Validators.required]]
      })
  }


  getAllCategories(){
    this.categories = [];
    this.customerService.getAllCategories().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.categories.push(element);
      });
    });
  }


  SearchCategory(){
    const title = this.searchCategoryForm.get('title')?.value;
    this.categories = [];
    this.customerService.getAllCategoriesByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.categories.push(element);
      });
    })
  }



}
