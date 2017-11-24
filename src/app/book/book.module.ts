import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookComponent } from './book.component';
import { BookListComponent } from './book-list.component';
import { BookDetailComponent } from './book-detail.component';

import {ElModule} from 'element-angular';

const routes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    data: {title: '图书'},
    children: [{
      path: ':id',
      component: BookDetailComponent,
      data: {title: '图书详情'}
    },{
      path: '',
      component: BookListComponent,
      data: {title: '图书列表'}
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
    BookComponent,
    BookListComponent,
    BookDetailComponent
  ]
})

export class BookModule { }
