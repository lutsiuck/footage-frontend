import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  req = req.clone({
    setHeaders: cookieService.check('token') ? { Authorization: `Bearer ${cookieService.get('token')}` } : {},
    url: environment.apiUrl + req.url
  });
  return next(req);
}