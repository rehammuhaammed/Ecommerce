import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly httpClient:HttpClient ) { }

  CheckoutSession(id:string,data:any):Observable<any>{
     return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      
      {
        "shippingAddress":data
      }
     )

  }

   
  CreateCashOrder(id:string,data:any):Observable<any>{
     return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
      
      {
        "shippingAddress":data
      }
     )

  }
}
