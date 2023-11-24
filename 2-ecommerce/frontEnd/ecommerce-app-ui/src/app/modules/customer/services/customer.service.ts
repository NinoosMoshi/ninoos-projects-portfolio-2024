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


  getAllProducts():Observable<any>{
    return this.http.get(`${this.BASIC_URL}/products`, {
      headers: this.createAuthorizationHeader()
    })
  }


  getAllProductsByName(name:string):Observable<any>{
    return this.http.get(`${this.BASIC_URL}/products/search/${name}`, {
      headers: this.createAuthorizationHeader()
    })
  }


  addToCart(productId:number):Observable<any>{
    const cartDto = {
      productId: productId,
      userId: StorageService.getUserId()
    }
    return this.http.post(`${this.BASIC_URL}/cart`, cartDto, {
      headers: this.createAuthorizationHeader()
    })
  }



  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
     'Authorization', 'Bearer ' + StorageService.getToken()
    )
 }


}
