import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 let ID=inject(PLATFORM_ID)
 let router=inject(Router)

if(isPlatformBrowser(ID)){
  //loged in or not
  // loggedin ----> has token in localStorage
 if(localStorage.getItem('token')!=null && localStorage.getItem('token')!='' ){
  //allow to access home 
  return true
 }else{
  //don't allow
  router.navigate(['/login'])
  return false
 }
}else{
  return false
}



};
