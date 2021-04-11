import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'mode': 'no-cors'
    }),
    // params: httpParam
  };
  readonly payLoad = {
    offset: 0
  };
  readonly ROOT_URL;


  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000";
  }

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  login(email: string, password: string){
    return this.http.post(`${this.ROOT_URL}/users/login`,{ email, password }, { observe: 'response' });
  }


  getDepDropDownValues():Observable<any> {
    return this.http.get<Account[]>(`${this.ROOT_URL}/account`);
  }


}
