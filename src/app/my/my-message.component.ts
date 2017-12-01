import { Component, OnInit} from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
 
@Component({
  template: `
    <div>
      <h2 class="sub-tit">我的信息</h2>
      <table class="my-table w">
        <tr>
          <th class="label">昵称：</th>
          <td>
            <el-input [(model)]="userInfo.username" placeholder="请输入内容"></el-input>
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
            <el-date-picker (modelChange)="handle($event)"
              (clear-click)="clearClickHandle($event)">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <th class="label">出生地：</th>
          <td>
            <el-cascader [options]="cities">
            </el-cascader>
          </td>
        </tr>
        <tr>
          <th class="label">名片：</th>
          <td>
            <el-input type="textarea"
              [autosize]="{minRows: 3, maxRows: 6}"
              [model]="textarea3">
            </el-input>
          </td>
        </tr>
        <tr>
          <th class="label">个性标签：</th>
          <td>
            <el-tag *ngFor="let tag of tags"
              [closable]="true"
              [type]="tag.type">
                {{tag.name}}
            </el-tag>
          </td>
        </tr>
        <tr>
          <th class="label"></th>
          <td>
            <el-button plain>确定</el-button>
            <el-button plain>取消</el-button>
          </td>
        </tr>
      </table>
    </div>
  `
})

export class MyMessageComponent implements OnInit{
  userInfo: {
    username: string,
    sex: string,
    birthDate: string,
    location: string,
    note: string,
    tags: string[],
  };

  constructor(
    private localStorage: CoolLocalStorage
  ){} 

  tags = [{
    name: '王者荣耀'
  },{
    name: '王者荣耀'
  },{
    name: '王者荣耀',
    type: 'success'
  },{
    name: '王者荣耀',
    type: 'warning'
  },{
    name: '王者荣耀',
    type: 'danger'
  }]

  ngOnInit(){
    this.userInfo = this.localStorage.getObject('userInfo')
  }
}