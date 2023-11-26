import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {

  categoryId:number = this.activatedRoute.snapshot.params['categoryId'];
  products:any[] = [];
  searchProductForm!:FormGroup


  constructor(private adminService: AdminService,
              private fb:FormBuilder,
              private activatedRoute:ActivatedRoute){}


  ngOnInit():void{
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title:[null, [Validators.required]]
      })
  }


  getAllProducts(){
    this.products = [];
    this.adminService.getAllProductByCategory(this.categoryId).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
    })
  }


  searchForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')?.value;

    this.adminService.getAllProductsByCategoryIdAndTitle(this.categoryId, title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
    })

  }



}
