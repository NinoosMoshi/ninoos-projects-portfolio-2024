import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {

  isSpinning:boolean = false;
  carForm!:FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  listOfOption: Array<{label:string; value:string}> = [];
  listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
  listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black'];
  listOfTransmission = ['Manual', 'Automatic'];


  constructor(private fb:FormBuilder,
              private adminService:AdminService,
              private message:NzMessageService,
              private router:Router){}


  ngOnInit(){
      this.carForm = this.fb.group({
        brand:[null, Validators.required],
        name:[null, Validators.required],
        type:[null, Validators.required],
        transmission:[null, Validators.required],
        color:[null, Validators.required],
        date:[null, Validators.required],
        price:[null, Validators.required],
        description:[null, Validators.required]
      })
  }




  postCar(): void{
    if(this.carForm.valid){
      console.log(this.carForm.value)
      this.isSpinning = true
      const formData:FormData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('brand', this.carForm.get('brand').value);
      formData.append('name', this.carForm.get('name').value);
      formData.append('type', this.carForm.get('type').value);
      formData.append('transmission', this.carForm.get('transmission').value);
      formData.append('color', this.carForm.get('color').value);
      formData.append('date', this.carForm.get('date').value);
      formData.append('price', this.carForm.get('price').value);
      formData.append('description', this.carForm.get('description').value);


       this.adminService.postCar(formData).subscribe({
        next:res =>{
          this.isSpinning = false
          this.message.success("Car posted successfully", {nzDuration:5000})
          this.router.navigateByUrl("/admin/dashboard")
        },
        error:err =>{
          this.message.error("Error while post car", {nzDuration:5000})
        }
       })

    }
    else{
      for(const i in this.carForm.controls){
        this.carForm.controls[i].markAsDirty();
        this.carForm.controls[i].updateValueAndValidity();

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
