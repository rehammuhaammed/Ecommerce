import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AllordersService {

  constructor(private readonly httpClient:HttpClient) { }


  getUserOrders(id:string):Observable<any>{
     return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }
     
}
