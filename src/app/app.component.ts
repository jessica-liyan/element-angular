import { rxSubscriber } from 'rxjs/symbol/rxSubscriber';
import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <div class="app">
    <nav class="nav row w">
      <div class="col v-m t-l">
        <a routerLink="/book" routerLinkActive="active">图书</a>
        <a routerLink="/movie" routerLinkActive="active">电影</a>
        <a routerLink="/admin" routerLinkActive="active">管理</a>
      </div>
      <div class="col v-m t-r">
        <a [routerLink]="[{ outlets: { popup: ['login'] } }]" style="margin: 0 20px;"><img src="../assets/image/login.png" class="v-m"/></a>
      </div>
    </nav>
    <router-outlet name="popup"></router-outlet>    
    <div class="main"><router-outlet></router-outlet></div>
  </div>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(){
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
}
