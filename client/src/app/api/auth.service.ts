import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  map } from 'rxjs/operators';

export const TOKEN_IDENT = 'token';
export const REFRESH_TOKEN_IDENT = 'refreshToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private helperService: JwtHelperService) {}

  login(username: string, password: string) {
    return this.apiService.login(username, password).
    pipe(
      map(token => {
                    localStorage.setItem(TOKEN_IDENT, token.token);
                    localStorage.setItem(REFRESH_TOKEN_IDENT, token.refreshToken);
                  }
      ));
  }

  userIsAdmin(): boolean {
    const rawToken = this.getToken();
    if (rawToken && this.isValid()) {
      try {
        const token = this.helperService.decodeToken(rawToken);
        return token.user_type === 'Admin';
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  isValid(): boolean {
    return !this.helperService.isTokenExpired(this.getToken());
  }

  logout() {
    localStorage.removeItem(TOKEN_IDENT);
    localStorage.removeItem(REFRESH_TOKEN_IDENT);
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_IDENT);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_IDENT);
  }
}
