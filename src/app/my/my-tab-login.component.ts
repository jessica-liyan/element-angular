import { Component, OnInit} from '@angular/core';
 
@Component({
  template: `
    <div>
      <table class="my-table w mt-20">
        <tr>
          <th class="label">用户名：</th>
          <td>
            <el-input [model]="input" placeholder="请输入用户名"></el-input>
          </td>
        </tr>
        <tr>
          <th class="label">密码：</th>
          <td>
            <el-input [model]="input" placeholder="请输入密码"></el-input>
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
      <p class="fs-14 c-9 mt-20">还没有账号！<a [routerLink]="['./register']" class="c-blue">立即注册</a></p>
    </div>
  `
})

export class LoginComponent implements OnInit{
  constructor(){} 

  ngOnInit(){
  }
}




