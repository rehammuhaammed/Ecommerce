import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService  {

  constructor( private readonly httpClient:HttpClient) { }

getCategories():Observable<any>{
  return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
}

}
