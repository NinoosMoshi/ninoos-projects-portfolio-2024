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


  addProduct(productDTO:any):Observable<any>{
    return this.http.post(`${this.BASIC_URL}/product`, productDTO, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllProducts():Observable<any>{
    return this.http.get(`${this.BASIC_URL}/products`, {
      headers: this.createAuthorizationHeader()
    })
  }




  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
     'Authorization', 'Bearer ' + StorageService.getToken()
    )
 }





}
