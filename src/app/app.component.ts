import { rxSubscriber } from 'rxjs/symbol/rxSubscriber';
import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CoolLocalStorage } from 'angular2-cool-storage';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as Rx from 'rxjs/Rx';
// import { LyModule } from 'ng5-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private localStorage: CoolLocalStorage
  ) {
    //console.log(LyModule)
  }

  show:boolean = false;
  loginIn:boolean = false;
  loginOut:boolean = false;
  username: string = '';
  loginInfo: {
    username: string
  };

  ngOnInit(){
    this.loginInfo = this.localStorage.getObject('loginInfo')
    if(this.loginInfo && this.loginInfo.username){
      this.username = this.loginInfo.username
    }else{
      this.username = '[未登录]'
    }

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(data => {
        this.titleService.setTitle(data['title'])
      })
  }

  login(){
    setTimeout(()=>{
      this.closePopup()
    },1000)
  }

  loginout(){
    this.loginOut = false
    this.localStorage.removeItem('loginInfo')
    setTimeout(()=>{
      window.location.reload()
    },300)
  }

  cancel(){
    this.closePopup()
  }

  closePopup() {
    this.router.navigate([{ outlets: { popup: null }}]);
  }
}
