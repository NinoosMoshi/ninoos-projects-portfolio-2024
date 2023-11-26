import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  productId:number = this.activatedRoute.snapshot.params['productId'];
  imgChanged = false;
  productForm!:FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null


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
    });
    this.getProductById();
  }

  getProductById(){
    this.adminService.getProductById(this.productId).subscribe(res =>{
      const productDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
      this.productForm.patchValue(productDto);
    })
  }


  updateProduct(): void{
    if(this.productForm.valid){
      const formData:FormData = new FormData();
      if(this.imgChanged && this.selectedFile){
        formData.append('img', this.selectedFile);
      }
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('description', this.productForm.get('description').value);

      this.adminService.updateProduct(this.productId,formData).subscribe({
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
    this.imgChanged = true;
    this.existingImage = null;
  }


  PreviewImage() {
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }


}
