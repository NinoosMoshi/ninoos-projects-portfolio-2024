import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private BASIC_URL = "http://localhost:8080/api/admin";

  constructor(private http:HttpClient) { }


  postCar(carDTO:any):Observable<any>{
    return this.http.post(`${this.BASIC_URL}/car`, carDTO, {
      headers: this.createAuthorizationHeader()
    })
  }


  getAllCars():Observable<any>{
    return this.http.get(`${this.BASIC_URL}/cars`, {
      headers: this.createAuthorizationHeader()
    })
  }


  deleteCar(id:number):Observable<any>{
    return this.http.delete(`${this.BASIC_URL}/car/${id}`, {
      headers:this.createAuthorizationHeader()
    })
  }


  getCarById(id:number):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/car/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }




  updateCar(carId:number, carDTO:any):Observable<any>{
    return this.http.put(`${this.BASIC_URL}/car/${carId}`, carDTO, {
      headers: this.createAuthorizationHeader()
    })
  }


  getBookings():Observable<any>{
    return this.http.get(`${this.BASIC_URL}/car/bookings`, {
      headers: this.createAuthorizationHeader()
    })
  }


  searchCar(searchCarDTO:any):Observable<any>{
    return this.http.post(`${this.BASIC_URL}/car/search`, searchCarDTO, {
      headers: this.createAuthorizationHeader()
    })
  }




  changeBookingStatus(bookingId:number, status:string):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/car/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    })
  }





  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }






}
