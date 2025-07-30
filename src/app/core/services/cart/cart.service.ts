import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private readonly httpClient:HttpClient) { }

  cartItems:WritableSignal<number>=signal(0)

  
  AddProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
          "productId": id
      }
    )
  }

  GetLoggedusercart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`
    )

  }

  RemoveSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`
    )

  }
  UpdateCartProductQuantity(id:string,count:any):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        
          "count": count
       }
    )

  }
  ClearUserCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`
    )

  }

  
}
