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


  addCategory(categoryDTO:any):Observable<any>{
    return this.http.post(`${this.BASIC_URL}/category`, categoryDTO, {
      headers: this.createAuthorizationHeader()
    })
  }


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



  postProduct(categoryId:number, productDTO:any):Observable<any>{
    return this.http.post(`${this.BASIC_URL}/${categoryId}/product`, productDTO, {
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


  deleteProduct(productId:number):Observable<any>{
    return this.http.delete(`${this.BASIC_URL}/product/${productId}`, {
      headers: this.createAuthorizationHeader()
    })
  }


  getProductById(productId:number):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/product/${productId}`, {
      headers: this.createAuthorizationHeader()
    })
  }


  updateProduct(productId:number, productDTO:any):Observable<any>{
    return this.http.put(`${this.BASIC_URL}/product/${productId}`, productDTO, {
      headers: this.createAuthorizationHeader()
    })
  }



  getAllReservations():Observable<any>{
    return this.http.get(`${this.BASIC_URL}/reservations`, {
      headers:this.createAuthorizationHeader()
    })
  }


  changeReservationStatus(reservationId:number, status:string):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/reservation/${reservationId}/${status}`,{
      headers:this.createAuthorizationHeader()
    })
  }



  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
     'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }





}
