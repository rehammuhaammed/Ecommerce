import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private readonly httpClient:HttpClient) { }

  whisList:WritableSignal<string[]>=signal([])
  whisListNum:WritableSignal<number>=signal(0)

  AddproductToWishlist(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      }
    )
  }
  RemoveProductFromWishlist(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }
  GetLoggedUserWishlist():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

}
