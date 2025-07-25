import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { constant, constantProduct } from '../constant/ConstantApi';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userName:  BehaviorSubject<string>= new BehaviorSubject<string>(localStorage.getItem('username')|| '' )
  constructor(private http: HttpClient) { }

  CartCount(id:string):Observable<any>{
    return this.http.get(`${constant}/my-cart/${id}`)
  }


  getProduct(): Observable<any> {
    return this.http.get(`${constantProduct}/products`);
  }
}
