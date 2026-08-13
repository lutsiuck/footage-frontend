import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { catchError, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  return next(req)
    .pipe(
      catchError((error) => {
        const domain = environment.hostUrl.includes('localhost') ? '' : environment.hostUrl;
      switch (error.status) {
        case 401:
          cookieService.deleteAll('/', domain);
          toastrService.error(error.error.message);
          router.navigate(['auth/login']);
          break;
        case 422:
          toastrService.error(error.error.message, 'Помилка');
          break;
        default:
          toastrService.error(error.error.message, 'Помилка');
          break;
      }
      return throwError(() => {});
      })
    );
}