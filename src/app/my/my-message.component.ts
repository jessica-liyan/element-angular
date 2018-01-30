import { Component, OnInit} from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { ElMessageService } from 'element-angular';
import {cities} from './cities';
 
@Component({
  template: `
    <div>
      <h2 class="sub-tit">修改我的信息</h2>
      <table class="my-table w mt-20">
        <tr>
          <th class="label">昵称/用户名：</th>
          <td>
            <el-input [(model)]="userInfo.username" placeholder="请输入昵称/用户名"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label">性别：</th>
          <td>
            <el-radio class="radio" [(model)]="userInfo.sex" label="男">男</el-radio>
            <el-radio class="radio" [(model)]="userInfo.sex" label="女">女</el-radio>
          </td>
        </tr>
        <tr>
          <th class="label">出生年月：</th>
          <td>
            <el-date-picker [(model)]="userInfo.birthDate" (modelChange)="date($event)">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <th class="label">出生地：</th>
          <td>
            <el-cascader [options]="cities" [model]="userInfo.location.path" (modelChange)="location($event)">
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
            <el-tag *ngFor="let tag of userInfo.tags"
                [closable]="true">
                {{tag}}
            </el-tag>
          </td>
        </tr>
        <tr>
          <th class="label"></th>
          <td>
            <el-button plain (click)="changeMessage()">确定</el-button>
            <el-button plain>取消</el-button>
          </td>
        </tr>
      </table>
    </div>
  `
})

export class MyMessageComponent implements OnInit{
  cities = [];
  userInfo: {
    username: string,
    sex: string,
    birthDate: string,
    location: {
      path: string[],
      value: string
    },
    note: string,
    tags: string[],
  };

  constructor(
    private message: ElMessageService,
    private localStorage: CoolLocalStorage
  ){} 

  // 初始化获取本地存储信息
  ngOnInit(){
    this.userInfo = this.localStorage.getObject('userInfo')
    console.log(this.userInfo)
    this.cities = cities
  }

  // 监听日期改变
  date(time){
    console.log(time,typeof time)
  }

  // 监听出生地的改变
  location(ev){
    this.userInfo.location = ev
  }
  
  // 修改信息，保存至本地
  changeMessage(){
    console.log(this.userInfo)
    this.localStorage.setObject('userInfo',this.userInfo)
    this.message.success('修改信息成功！')
  }
}