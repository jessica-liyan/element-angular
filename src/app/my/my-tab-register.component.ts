import { Component, OnInit} from '@angular/core';
import {cities} from './cities';
import { ElMessageService } from 'element-angular'
 
@Component({
  template: `
    <div>
      <table class="my-table w mt-20">
        <tr>
          <th class="label">昵称/用户名：</th>
          <td>
            <el-input [(model)]="username" placeholder="请输入昵称/用户名"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label">性别：</th>
          <td>
            <el-radio class="radio" [(model)]="sex" label="男">男</el-radio>
            <el-radio class="radio" [(model)]="sex" label="女">女</el-radio>
          </td>
        </tr>
        <tr>
          <th class="label">出生年月：</th>
          <td>
            <el-date-picker [(model)]="birthDate">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <th class="label">出生地：</th>
          <td>
            <el-cascader [options]="cities" [(model)]="location">
            </el-cascader>
          </td>
        </tr>
        <tr>
          <th class="label">个人说明：</th>
          <td>
            <el-input type="textarea"
              [autosize]="{minRows: 3, maxRows: 6}"
              [(model)]="note">
            </el-input>
          </td>
        </tr>
        <tr>
          <th class="label">个性标签：</th>
          <td>
          <el-checkbox-group [model]="['王者荣耀']" (modelChange)="handle($event)">
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
  username: string; 
  sex: string;
  birthDate: string;
  location: string;
  note: string;
  tags: string[];

  constructor(
    private message: ElMessageService
  ){} 

  ngOnInit(){
    this.cities = cities
  }

  handle(tags){
    this.tags = tags
  }
  
  // 个人说
  明和个人标签选填
  submit(){
    console.log(this.username,this.sex,this.birthDate,this.location,this.note,this.tags)
    if(!this.username){
      this.message.error('用户名不能为空！')
    }else if(!this.sex){
      this.message.error('性别不能为空！')
    }else if(!this.birthDate){
      this.message.error('出生日期不能为空！')
    }else if(!this.location){
      this.message.error('出生地不能为空！')
    }else{
      
    }
  }
}




