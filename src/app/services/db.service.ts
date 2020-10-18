import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  selectedUser: User = {
    name: "",
    email: "",
    password: "",
  };
  apiURL: string;
 
  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(this.apiURL + "/register", user);
  }
  login(user: User) {
    return this.http.post(this.apiURL + "/login", user);
  }
}
