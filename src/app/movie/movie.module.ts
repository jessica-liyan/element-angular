import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovieComponent } from './movie.component';
import { MovieHomeComponent } from './movie-home.component';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieTabComponent } from './movie-tab.component';
import { MovieTabListComponent } from './movie-tab-list.component';
import { MovieListsComponent } from './movie-lists.component';

import { ElModule} from 'element-angular';

const routes: Routes = [{
  path: 'movie',
  component: MovieComponent,
  data: {title: '电影'},
  children: [{
    path: '',
    component: MovieHomeComponent,
    data: {title: '电影列表'}
  },{
    path: ':id',
    component: MovieDetailComponent,
    data: {title: '电影详情'}
  },{
    path: 'type/:id',
    component: MovieTabComponent
  }]
}]

@NgModule({
  imports: [
    ElModule.forRoot(),
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MovieComponent,
    MovieHomeComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieTabComponent,
    MovieTabListComponent,
    MovieListsComponent
  ]
})

export class MovieModule { }
