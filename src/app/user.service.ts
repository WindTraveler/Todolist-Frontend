import { Injectable } from '@angular/core';
import { Todo } from "./entity/todo";

import { Headers, Http } from "@angular/http"

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  isLoggedIn : boolean = false;

  private base = "http://localhost:5270/api";
  private loginUrl = this.base + '/login/';
  private registerUrl = this.base + '/register/';
  private logoutUrl = this.base + '/logout/';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { }

  register(userInfo) {
    return this.http
      .post(this.registerUrl, JSON.stringify(userInfo), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as object)
      .catch(this.handleError);
  }

  login(userInfo){
    return this.http
      .post(this.loginUrl, JSON.stringify(userInfo), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as object)
      .catch(this.handleError);
  }

  logout(){
    return this.http
      .get(this.logoutUrl)
      .toPromise()
      .then(response => response.json() as object)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
