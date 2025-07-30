import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SweetalertService } from '../../services/sweetalert/sweetalert.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  let sweetalertService=inject(SweetalertService)
  let id=inject(PLATFORM_ID)


  if(!req.url.includes('auth')){
    
   return next(req).pipe(catchError((err)=>{
    if(isPlatformBrowser(id)){
      //handel when user try to set  the token manually 
      if(err.error.message==='Invalid Token. please login again'){
      // if the error is Invalid Token. please login again, redirect to login
      sweetalertService.showError('You need to login first')
      localStorage.removeItem('token')
      setTimeout(() => {
        window.location.href='/login'
      }, 1000);
    }else{
      sweetalertService.showError(err.error.message)
    }
    }
    return throwError(()=>err)
  }))
  }else{
    return next(req)
  }


};
