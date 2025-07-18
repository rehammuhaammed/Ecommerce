import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
let ID=inject(PLATFORM_ID)

if(isPlatformBrowser(ID)){
//Already logged in 
//Don't allow to return to loginpage by path 
if(localStorage.getItem('token')!=null){
  return false
}else{
  return true
}





}else{
  return false
}






};
