import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPassService {

  constructor( private readonly httpClient:HttpClient) { }


  forgetpass(email:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }

  resetPass(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

   verifyCode(code:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }


}
