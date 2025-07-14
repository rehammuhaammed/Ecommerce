import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly httpClient:HttpClient) { }

getAllproducts():Observable<any> {
return  this.httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
}


 getProducts(page: number, limit: number): Observable<any> {
  return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`);
}
}
