import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IRegister } from '../../shared/models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieService = inject(CookieService);
  private http = inject(HttpClient);

  currentUser = new BehaviorSubject<IUser | null>(null);

  login(payload: { email: string; password: string }): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>('/auth/login', payload);
  }

  register(payload: IRegister): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>('/auth/register', payload);
  }

  logout() {
    return this.http.post('/auth/logout', {});
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>('/auth/me');
  }

  setAuthData(authData: {accessToken: string}) {
    const domain = environment.hostUrl.includes('localhost') ? '' : environment.hostUrl;
    this.cookieService.set(
      'token',
      authData.accessToken,
      { domain, path: '/', sameSite: 'Lax' }
    );
  }
}
