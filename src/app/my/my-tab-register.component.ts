import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {cities} from './cities';
import { ElMessageService } from 'element-angular';
import { CoolLocalStorage } from 'angular2-cool-storage';
 
@Component({
  template: `
    <div>
      <table class="my-table w mt-20">
        <tr>
          <th class="label">昵称/用户名<i class="c-red">*</i>：</th>
          <td>
            <el-input [(model)]="userInfo.username" placeholder="请输入昵称/用户名"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label">登录密码<i class="c-red">*</i>：</th>
          <td>
            <el-input [(model)]="userInfo.password" placeholder="请输入登录密码"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label">再次输入密码<i class="c-red">*</i>：</th>
          <td>
            <el-input [(model)]="passwordAgain" placeholder="请再次输入密码"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label">性别<i class="c-red">*</i>：</th>
          <td>
            <el-radio class="radio" [(model)]="userInfo.sex" label="男">男</el-radio>
            <el-radio class="radio" [(model)]="userInfo.sex" label="女">女</el-radio>
          </td>
        </tr>
        <tr>
          <th class="label">出生年月<i class="c-red">*</i>：</th>
          <td>
            <el-date-picker [(model)]="userInfo.birthDate">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <th class="label">出生地<i class="c-red">*</i>：</th>
          <td>
            <el-cascader [options]="cities" [(model)]="userInfo.location">
            </el-cascader>
          </td>
        </tr>
        <tr>
          <th class="label">个人说明：</th>
          <td>
            <el-input type="textarea"
              [autosize]="{minRows: 3, maxRows: 6}"
              [(model)]="userInfo.note">
            </el-input>
          </td>
        </tr>
        <tr>
          <th class="label">个性标签：</th>
          <td>
            <el-checkbox-group [(model)]="userInfo.tags">
              <el-checkbox label="王者荣耀"></el-checkbox>
              <el-checkbox label="LOL"></el-checkbox>
              <el-checkbox label="周杰伦"></el-checkbox>
              <el-checkbox label="薛之谦"></el-checkbox>
              <el-checkbox label="刘德华"></el-checkbox>
              <el-checkbox label="张学友"></el-checkbox>
              <el-checkbox label="陈奕迅"></el-checkbox>
              <el-checkbox label="王菲"></el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <th class="label"></th>
          <td>
            <el-button plain (click)="submit()">确定</el-button>
            <el-button plain>取消</el-button>
          </td>
        </tr>
      </table>
    </div>
  `
})

export class RegisterComponent implements OnInit{
  cities = [];
  userInfo: {
    username: string,
    password: string,
    sex: string,
    birthDate: string,
    location: {
      path: string[],
      value: string
    },
    note?: string,
    tags?: string[],
  } = {
    username: '',
    password: '',
    sex: '',
    birthDate: '',
    location: {
      path: [],
      value: ''
    },
    note: '',
    tags: [],
  };
  passwordAgain: string;

  constructor(
    private router: Router,
    private message: ElMessageService,
    private localStorage: CoolLocalStorage
  ){}

  ngOnInit(){
    this.cities = cities
  }
  
  // 个人说明和个人标签选填
  submit(){
    if(!this.userInfo.username){
      this.message.error('用户名不能为空！')
    }else if(!this.userInfo.password){
      this.message.error('密码不能为空！')
    }else if(!this.passwordAgain){
      this.message.error('请再次输入密码！')
    }else if(this.passwordAgain !== this.userInfo.password){
      this.message.error('两次输入密码不一致！')
    }else if(!this.userInfo.sex){
      this.message.error('性别不能为空！')
    }else if(!this.userInfo.birthDate){
      this.message.error('出生日期不能为空！')
    }else if(!this.userInfo.location){
      this.message.error('出生地不能为空！')
    }else{
      this.message.success('注册成功！请登录')
      this.localStorage.setObject('userInfo', this.userInfo);
      this.router.navigate(['/login'])
    }
  }
}




