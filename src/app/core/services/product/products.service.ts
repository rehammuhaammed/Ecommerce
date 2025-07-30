import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly httpClient:HttpClient) { }

   getAllProducts(limit?:number,page?:number,categoryId?:string,sort?:string,brand?:string): Observable<any> {
    let params=new HttpParams()
    if(limit){
      params=params.set('limit',limit)
    }
    if(page){
      params=params.set('page',page)
    }
    if(categoryId){
      params=params.set('category[in]',categoryId)
    }
    if(sort){
      params=params.set('sort',sort)
    }
    if(brand){
      params=params.set('brand',brand)
    }
    
  return this.httpClient.get(`${environment.baseUrl}/api/v1/products`,{params});
}
 


getSpecificProduct(id:string):Observable<any>{
return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
}
GetAllBrands(limit?:number,page?:number):Observable<any>{
  let params=new HttpParams()
    if(limit){
      params=params.set('limit',limit)
    }
    if(page){
      params=params.set('page',page)
    }
return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`,{params})
}



}
