import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent {

  searchCarForm!:FormGroup
  isSpinning:boolean = false;

  // listOfOption: Array<{label:string; value:string}> = [];
  listOfBrands = ['BMW','AUDI','TESLA','TOYOTA','HONDA'];
  listOfType = ['Petrol','Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black'];
  listOfTransmission = ['Manual', 'Automatic'];

 constructor(private fb:FormBuilder){}

 ngOnInit(){
   this.searchCarForm = this.fb.group({
    brand:[null],
    type:[null],
    transmission:[null],
    color:[null]
   })
 }


 searchCar(){
   console.log(this.searchCarForm.value)
 }



}
