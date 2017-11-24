import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate {
  isLogined = false;

  constructor(
    private router: Router
  ){}

  canActivate(){
    // 判断是否登录，如果登录return true，未登录，return false
    if(this.isLogined){
      return true
    }else{
      this.router.navigate([{outlets: {popup: ['login']}}])
      return false
    }
  }

}
