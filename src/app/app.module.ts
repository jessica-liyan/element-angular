import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule, JsonpModule} from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ElModule} from 'element-angular';

import {BookModule} from './book/book.module';
import {MovieModule} from './movie/movie.module';
import {MyModule} from './my/my.module';
import {DoubanService} from './douban.service';

const routes: Routes = [{
  path: '',
  redirectTo: '/movie',
  pathMatch: 'full'
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
    MovieModule,
    MyModule,
    RouterModule.forRoot(routes,{
      enableTracing: false
    })
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [DoubanService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
