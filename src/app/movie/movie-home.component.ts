import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoubanService} from './../douban.service';
import {MovieListComponent} from './movie-list.component';

@Component({
  selector: 'movie',
  template: `
  <h2 class="sub-tit">正在热映<a class="more" [routerLink]="['/movie/type',0]">更多></a></h2>
  <movie-list [data]="movieInTheater"></movie-list>
  <h2 class="sub-tit">即将上映<a class="more" [routerLink]="['/movie/type',1]">更多></a></h2>
  <movie-list [data]="movieInComing"></movie-list>
  `
})

export class MovieHomeComponent implements OnInit{
  city : string = '武汉';
  movieInTheater = [];
  movieInComing = [];

  constructor(
    private DoubanService: DoubanService,
    private router: Router
  ){} 
  
  ngOnInit():void{
    this.DoubanService.getMovieInTheater(this.city,0,10).subscribe((res)  => {
      this.movieInTheater = res["subjects"]
    })
    this.DoubanService.getMovieInComing(0,10).subscribe((res)  => {
      this.movieInComing = res["subjects"]
    })
  }

  getCasts(item){
    return item.casts.map((item,idx)=>item.name).join('/')
  }
}




