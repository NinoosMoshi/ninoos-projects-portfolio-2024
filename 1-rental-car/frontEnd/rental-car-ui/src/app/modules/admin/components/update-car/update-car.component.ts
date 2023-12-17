import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent {

   imgChanged:boolean = false;
   selectedFile:any;
   imagePreview:string | ArrayBuffer | null;

   existingImage:string | null = null;
   isSpinning:boolean = false;
   carForm!:FormGroup;
   listOfOption: Array<{label:string; value:string}> = [];
   listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
   listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];
   listOfColor = ['Red', 'White', 'Blue', 'Black'];
   listOfTransmission = ['Manual', 'Automatic'];

   carId:number = this.activatedRoute.snapshot.params['id'];


  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private message:NzMessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute){}



ngOnInit(){
  this.carForm = this.fb.group({
    brand:[null, Validators.required],
    name:[null, Validators.required],
    type:[null, Validators.required],
    transmission:[null, Validators.required],
    color:[null, Validators.required],
    year:[null, Validators.required],
    price:[null, Validators.required],
    description:[null, Validators.required]
  })
  this.getCarById();
}


getCarById(){
  this.isSpinning = true
   this.adminService.getCarById(this.carId).subscribe({
    next:res =>{
      this.isSpinning = false
      this.message.success("Get Car successfully", {nzDuration:5000})
      const carDTO = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnImage;
      this.carForm.patchValue(carDTO);

    },
    error:err =>{
      this.message.error("Error while getting car", {nzDuration:5000})
    }
   })
}




updateCar(){
    this.isSpinning = true;
    const formData:FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
       formData.append('image', this.selectedFile)
    }
    formData.append('brand',this.carForm.get('brand').value);
    formData.append('name',this.carForm.get('name').value);
    formData.append('type',this.carForm.get('type').value);
    formData.append('transmission',this.carForm.get('transmission').value);
    formData.append('color',this.carForm.get('color').value);
    formData.append('year',this.carForm.get('year').value);
    formData.append('description',this.carForm.get('description').value);
    formData.append('price',this.carForm.get('price').value);

    console.log(formData)

    this.adminService.updateCar(this.carId,formData).subscribe({
      next:res =>{
        this.isSpinning = false;
        this.message.success("Update Car successfully", {nzDuration:5000})
        this.router.navigateByUrl("/admin/dashboard")
        console.log(res)
      },
      error:err =>{
        this.message.error("Error while updating the car", {nzDuration:5000})
        console.log(err)
      }
    })

}


onFileSelected(event:any){
  this.selectedFile = event.target.files[0];
  this.imgChanged = true;
  this.existingImage = null;
  this.previewImage();
}

previewImage(){
 const reader = new FileReader();
 reader.onload = () =>{
   this.imagePreview = reader.result;
 }
 reader.readAsDataURL(this.selectedFile);
}




}
