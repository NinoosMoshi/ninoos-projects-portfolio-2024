import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent {

  searchCarForm!:FormGroup
  isSpinning:boolean = false;
  cars:any = [];

  // listOfOption: Array<{label:string; value:string}> = [];
  listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
  listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black'];
  listOfTransmission = ['Manual', 'Automatic'];

 constructor(private fb:FormBuilder, private customerService:CustomerService){}

 ngOnInit(){
   this.searchCarForm = this.fb.group({
    brand:[null],
    type:[null],
    transmission:[null],
    color:[null]
   })
 }


 searchCar(){
   this.isSpinning = true
   this.customerService.searchCar(this.searchCarForm.value).subscribe({
    next:res =>{
      console.log(res)
      res.carDTOList.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnImage;
        this.cars.push(element);
      });
      this.isSpinning = false;
    },
    error:err =>{

    }
   })
 }

}
