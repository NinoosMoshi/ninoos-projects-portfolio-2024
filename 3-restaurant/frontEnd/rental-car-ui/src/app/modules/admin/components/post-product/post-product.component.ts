import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})
export class PostProductComponent {

  categoryId:number = this.activatedRoute.snapshot.params['categoryId'];
  productForm!:FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;


  constructor(private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.productForm = this.fb.group({
      name:[null, Validators.required],
      price:[null, Validators.required],
      description:[null, Validators.required]
    })
  }


  addProduct(): void{
    if(this.productForm.valid){
      const formData:FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('description', this.productForm.get('description').value);

      this.adminService.postProduct(this.categoryId,formData).subscribe({
        next:res =>{
          if(res.id != null){
            this.snackBar.open('Product Posted Successfully', 'Close', {duration:5000});
            this.router.navigateByUrl("/admin/dashboard");
          }else{
            this.snackBar.open(res.message, 'Close', {duration:5000, panelClass: 'error-snackbar'});
          }
        },
        error:err =>{
          this.snackBar.open(err.message, 'Close', {duration:5000, panelClass: 'error-snackbar'});
        }
      })

    }
    else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();

      }
    }
  }




  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.PreviewImage();
  }


  PreviewImage() {
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }




}
