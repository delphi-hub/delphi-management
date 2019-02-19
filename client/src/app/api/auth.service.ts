import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {
   }

  login(username: string, password: string) {
    this.apiService.login(username, password).subscribe((token: string) => {
      console.log('got token', token);
      localStorage.setItem('id_token', token);
    });
  }
}
