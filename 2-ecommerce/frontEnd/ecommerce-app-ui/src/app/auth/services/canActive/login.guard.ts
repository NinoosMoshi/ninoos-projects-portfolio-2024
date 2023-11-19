
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../storage/storage.service';


export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if(StorageService.isCustomerLoggedIn()){
    router.navigateByUrl("/customer/dashboard");
    return false;
  }

  return true;

};
