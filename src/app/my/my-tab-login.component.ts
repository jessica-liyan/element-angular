import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ElMessageService } from 'element-angular';
import { CoolLocalStorage } from 'angular2-cool-storage';
 
@Component({
  template: `
    <div>
      <table class="my-table w mt-20">
        <tr>
          <th class="label">用户名：</th>
          <td>
            <el-input [(model)]="username" placeholder="请输入用户名"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label">密码：</th>
          <td>
            <el-input [(model)]="password" placeholder="请输入密码"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label"></th>
          <td>
            <el-button plain (click)="login()">确定</el-button>
            <el-button plain>取消</el-button>
          </td>
        </tr>
      </table>
      <p class="fs-14 c-9 mt-20">还没有账号！<a [routerLink]="['./register']" class="c-blue">立即注册</a></p>
    </div>
  `
})

export class LoginComponent implements OnInit{
  username: string;
  password: string;
  userInfo: {
    username: string;
    password: string;
  };

  constructor(
    private router: Router,
    private message: ElMessageService,
    private localStorage: CoolLocalStorage
  ){} 

  ngOnInit(){
    this.userInfo = this.localStorage.getObject('userInfo')
    console.log(this.userInfo)
  }

  // 登录
  login(){
    console.log(this.username,this.password)
    if(!this.username){
      this.message.error('用户名不能为空！')
    }else if(!this.password){
      this.message.error('密码不能为空！')
    }else if(this.username !== this.userInfo.username){
      this.message.error('用户名不存在！')
    }else if(this.password !== this.userInfo.password){
      this.message.error('密码不对，请再次输入！')
    }else{
      this.message.success('登录成功！')
      this.localStorage.setObject('loginInfo', {
        username: this.username,
        password: this.password
      })
      this.router.navigate(['/'])
      window.location.reload();
    }
  }
}




