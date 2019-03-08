import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  map } from 'rxjs/operators';

export const TOKEN_IDENT = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, public helperService: JwtHelperService) {}
  // TODO: store refresh token
  login(username: string, password: string) {
    return this.apiService.login(username, password).
    pipe(
      map(token => localStorage.setItem(TOKEN_IDENT, token.token)
      ));
  }

  isValid(): boolean {
    // TODO: for dev purpose it will be sufficient to return true here and thereby skipp
    // the authorization in the complete application
    return !this.helperService.isTokenExpired(this.getToken());
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_IDENT);
  }
}
