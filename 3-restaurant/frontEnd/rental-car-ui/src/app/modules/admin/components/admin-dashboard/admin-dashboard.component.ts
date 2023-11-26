import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  categories:any[] = [];
  searchCategoryForm!:FormGroup



  constructor(private adminService: AdminService,private fb:FormBuilder){}


  ngOnInit():void{
    this.getAllCategories();
    this.searchCategoryForm = this.fb.group({
      title:[null, [Validators.required]]
      })
  }


  getAllCategories(){
    this.categories = [];
    this.adminService.getAllCategories().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.categories.push(element);
      });
    });
  }


  SearchCategory(){
    const title = this.searchCategoryForm.get('title')?.value;
    this.categories = [];
    this.adminService.getAllCategoriesByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.categories.push(element);
      });
    })
  }



}
