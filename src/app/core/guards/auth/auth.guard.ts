import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 let ID=inject(PLATFORM_ID)


if(isPlatformBrowser(ID)){
  //loged in or not
  // loggedin ----> has token in localStorage
 if(localStorage.getItem('token')!=null){
  //allow to access home 
  return true
 }else{
  //don't allow
  return false
 }
}else{
  return false
}



};
