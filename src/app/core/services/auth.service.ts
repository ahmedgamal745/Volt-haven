import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterData } from '../interfaces/register-data';
import { Observable } from 'rxjs';
import { constant } from '../constant/ConstantApi';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   ; // 🔁 Replace with your real backend URL

  constructor(private http: HttpClient) {}

  userRegister(data: RegisterData): Observable<any> {
    return this.http.post(`${constant}/api/users`, data);
  }

  
  userLogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${constant}/login`, credentials);
  }
}
