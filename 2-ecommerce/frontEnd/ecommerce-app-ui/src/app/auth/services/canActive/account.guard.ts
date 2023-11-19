import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const accountGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  if(sessionStorage.getItem('emailAtive') == null){
    router.navigateByUrl("/register")
    return false;
  }

  return true;



};
