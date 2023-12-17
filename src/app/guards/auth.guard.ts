import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStatus = inject(AuthService)
  const toaster = inject(ToasterService)
  const router = inject(Router)


  if(authStatus.isLoggined()){
    return true;
  }else{
    toaster.showWarning('please login!!!')
    router.navigateByUrl('')
    return false;
  }
 
};
