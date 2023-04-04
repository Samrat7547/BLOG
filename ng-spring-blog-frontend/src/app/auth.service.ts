import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RegisterPayload } from './auth/register-payload';
import { Observable, map } from 'rxjs';
import { LoginPayload } from './auth/login-payload';
import { JwtAutResponse } from './auth/jwt-auth-response';
import {LocalStorageService} from 'ngx-webstorage';

// const httpOptions = {
//   headers: new HttpHeaders({
//       'responseType': 'JSON'})
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient,private localStoraqeService: LocalStorageService) { 

  }
  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
    
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload)
    .pipe(map(data => {
      this.localStoraqeService.store('authenticationToken', data.authenticationToken);
      this.localStoraqeService.store('username', data.username);
      return true;
    }));
 }

  isAuthenticated(): boolean {
  return this.localStoraqeService.retrieve('username') != null;
  }
  logout() {
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
  }
}
