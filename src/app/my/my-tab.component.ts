import { Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
 
@Component({
  template: `
    <div>
      <el-menu theme="light" model="{{id}}" mode="horizontal">
        <el-menu-item index="0"><a [routerLink]="['./']" (click)="change(0)">登录</a></el-menu-item>
        <el-menu-item index="1"><a [routerLink]="['./register']" (click)="change(1)">注册</a></el-menu-item>
      </el-menu>
      <router-outlet></router-outlet>
    </div>
  `
})

export class TabComponent implements OnInit{
  id: number;
  constructor(
    private router: Router,
  ){} 

  change(id){
    this.id = id
  }

  ngOnInit(){
    // 监听路由切换和跳转事件，判断id
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(res => {
        if(res["url"] == '/login'){
          this.id = 0
        }else{
          this.id = 1
        }
      })
    // 页面初始化，判断id
    if(this.router.url == '/login'){
      this.id = 0
    }else{
      this.id = 1
    }
  }
}




