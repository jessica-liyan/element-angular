import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { CoolLocalStorage } from 'angular2-cool-storage';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  constructor(
    private localStorage: CoolLocalStorage
  ){}

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  login1(){
    if(this.localStorage.getObject('loginInfo')){
      this.isLoggedIn = true
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}