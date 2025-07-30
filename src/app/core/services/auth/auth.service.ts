
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient:HttpClient) { }
UserData:any

  signup(data:object):Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  signin(data:object):Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  decodeToken(){
   const token=localStorage.getItem('token')!
   return this.UserData= jwtDecode(token)
   
  }
}
