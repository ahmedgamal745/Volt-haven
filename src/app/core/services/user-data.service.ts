import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { constant } from '../constant/ConstantApi';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userName:  BehaviorSubject<string>= new BehaviorSubject<string>(localStorage.getItem('username')|| '' )
  constructor(private http: HttpClient) { }

  CartCount(id:string):Observable<any>{
    return this.http.get(`${constant}/my-cart/${id}`)
  }
}
