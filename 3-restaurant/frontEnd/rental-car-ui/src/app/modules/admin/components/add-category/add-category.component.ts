import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  categoryForm!:FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router){}

  ngOnInit(){
    this.categoryForm = this.fb.group({
      categoryId:[null, Validators.required],
      name:[null, Validators.required],
      description:[null, Validators.required]
    })

  }



  addCategory(): void{
    if(this.categoryForm.valid){
      const formData:FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('name', this.categoryForm.get('name').value);
      formData.append('description', this.categoryForm.get('description').value);

      this.adminService.addCategory(formData).subscribe({
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
      for(const i in this.categoryForm.controls){
        this.categoryForm.controls[i].markAsDirty();
        this.categoryForm.controls[i].updateValueAndValidity();

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
