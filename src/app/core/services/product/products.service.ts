import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly httpClient:HttpClient) { }

 getProducts(page: number, limit: number): Observable<any> {
  return this.httpClient.get(`${environment.baseUrl}/products?page=${page}&limit=${limit}`);
}

getSpecificProduct(id:string):Observable<any>{
return this.httpClient.get(`${environment.baseUrl}/products/${id}`)
}
}
