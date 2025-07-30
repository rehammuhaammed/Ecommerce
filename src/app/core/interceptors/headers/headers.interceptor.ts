import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
let id=inject(PLATFORM_ID)
 //logic on  req


  if(isPlatformBrowser(id)){
  if(localStorage.getItem('token')!=null){
    if(req.url.includes('cart')||req.url.includes('orders')||req.url.includes('wishlist')){
          req=req.clone(
        {
          setHeaders:{
            token:localStorage.getItem('token')!
          }
        })
    }

  }
  }

  return next(req);// login on res
};
