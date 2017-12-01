import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyCenterComponent } from './my-center.component';
import { MyMessageComponent } from './my-message.component';
import { TabComponent } from './my-tab.component';
import { LoginComponent } from './my-tab-login.component';
import { RegisterComponent } from './my-tab-register.component';

import {ElModule} from 'element-angular';

const routes: Routes = [
  {
    path: 'myCenter',
    component: MyCenterComponent,
    data: {title: '我的中心'}
  },{
    path: 'myMessage',
    component: MyMessageComponent,
    data: {title: '我的信息'}
  },{
    path: 'login',
    component: TabComponent,
    children: [{
      path: '',
      component: LoginComponent,
      data: {title: '登录'}
    },{
      path: 'register',
      component: RegisterComponent,
      data: {title: '注册'}
    }]
  }
]

@NgModule({
  imports: [
    ElModule.forRoot(),
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyCenterComponent,
    MyMessageComponent,
    TabComponent,
    LoginComponent,
    RegisterComponent
  ]
})

export class MyModule { }
