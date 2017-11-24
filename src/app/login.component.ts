import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template:  `
    <div class="popup">
      <h2 class="mb-20">登录</h2>
      <input type="text" placeholder="用户名"/>
      <input type="text" placeholder="密码"/>
      <div class="t-c pt-20">
        <a class="btn" (click)="login()">登录</a>
        <a class="btn" (click)="cancel()">取消</a>
      </div>
    </div>
  `
})

export class LoginComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  login(){
    setTimeout(()=>{
      this.closePopup()
    },1000)
  }
  cancel(){
    this.closePopup()
  }

  closePopup() {
    this.router.navigate([{ outlets: { popup: null }}]);
  }
}