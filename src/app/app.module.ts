import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule, JsonpModule} from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './page-not-found.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ElModule} from 'element-angular';

import {BookModule} from './book/book.module';
import {DoubanService} from './douban.service';

const routes: Routes = [{
  path: '',
  redirectTo: '/movie',
  pathMatch: 'full'
},{
  path: 'login',
  component: LoginComponent,
  outlet: 'popup'
},{
  path: '**',
  component: PageNotFoundComponent,
}]


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModule.forRoot(),
    ElModule.forRoot(),
    BookModule,
    RouterModule.forRoot(routes,{
      enableTracing: false
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  providers: [DoubanService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
