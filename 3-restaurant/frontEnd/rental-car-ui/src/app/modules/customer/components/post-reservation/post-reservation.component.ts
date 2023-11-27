import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-post-reservation',
  templateUrl: './post-reservation.component.html',
  styleUrls: ['./post-reservation.component.css']
})
export class PostReservationComponent {

  selectedTime: string;

  selectedDate: Date;

  TableType: string[] = [
    "Standard Table",
    "Booth",
    "Bar Table",
    "Outdoor Table"
  ]


  reservationForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.reservationForm = this.fb.group({
      tableType:[null, Validators.required],
      dateTime:[null, Validators.required],
      timePicker: [null, Validators.required],
      description:[null, Validators.required]
    })
  }



  postReservation(){
    const tableType = this.reservationForm.get('tableType')?.value;
    const dateTime = this.reservationForm.get('dateTime')?.value;
    const timePicker = this.reservationForm.get('timePicker')?.value;
    const description = this.reservationForm.get('description')?.value;

    if(this.reservationForm.valid){
    //  console.log("table type is: " + tableType);
    //  console.log("date of reservation is: " + dateTime);
    //  console.log("description is: " + description);
    //  console.log(this.reservationForm.value)



     this.customerService.postReservation(this.reservationForm.value).subscribe(res =>{
       console.log("successfully submited")
     })

    }
    else{
      for(const i in this.reservationForm.controls){
        this.reservationForm.controls[i].markAsDirty();
        this.reservationForm.controls[i].updateValueAndValidity();
      }
    }
  }



}
