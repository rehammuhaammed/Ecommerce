import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService  {

  constructor( private readonly httpClient:HttpClient) { }

getCategories():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/categories`)
}

}
