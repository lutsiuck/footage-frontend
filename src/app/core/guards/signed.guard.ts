import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

export const signedGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.check('token')) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
}