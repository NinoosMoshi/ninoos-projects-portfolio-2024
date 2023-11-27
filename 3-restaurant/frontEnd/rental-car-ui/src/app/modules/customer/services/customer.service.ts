import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASIC_URL = "http://localhost:8080/api/customer";

  constructor(private http:HttpClient) { }


  getAllCategories():Observable<any>{
    return this.http.get(`${this.BASIC_URL}/categories`, {
      headers: this.createAuthorizationHeader()
    })
  }


  getAllCategoriesByName(name:string):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/categories/search/${name}`, {
      headers: this.createAuthorizationHeader()
    })
  }


  getAllProductByCategory(categoryId:number):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/${categoryId}/products`, {
      headers: this.createAuthorizationHeader()
    })
  }



  getAllProductsByCategoryIdAndTitle(categoryId:number, name:string):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/${categoryId}/product/${name}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  postReservation(reservationDTO:any):Observable<any>{
    reservationDTO.customerId = StorageService.getUserId();
    return this.http.post(`${this.BASIC_URL}/reservation`, reservationDTO, {
      headers: this.createAuthorizationHeader()
    })
  }


  getReservationsByUser():Observable<any>{
    return this.http.get(`${this.BASIC_URL}/reservations/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    })
  }



  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
     'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }





}
