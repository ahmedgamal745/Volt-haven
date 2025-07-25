import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterData } from '../interfaces/register-data';
import { Observable } from 'rxjs';
import { constant } from '../constant/ConstantApi';
import { LoginData } from '../interfaces/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   ; // 🔁 Replace with your real backend URL

  constructor(private http: HttpClient) {}

  userRegister(data: RegisterData): Observable<any> {
    return this.http.post(`${constant}/api/users`, data);
  }

  
  userLogin(credentials:LoginData): Observable<any> {
    return this.http.post(`${constant}/api/users/auth`, credentials);
  }

  handleAuth() : boolean{
    if(localStorage.getItem('token')!=null){
      return true
    }else{
      return false
    }

  }


  logout(): Observable<any> {
    return this.http.post(`${constant}/api/users/logout`, {});
  }
}
