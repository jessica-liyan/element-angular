import { Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { DoubanService } from './../douban.service';
 
@Component({
  selector: 'movie-list',
  template: `
  <ul class="listBlock">
    <li *ngFor="let item of data" (click)="gotoDetail(item.id)">
      <el-card body-style="padding:20px 10px;height:320px;">
        <i class="block img" *ngIf="item.images"><img src="{{item.images.small}}" class="h v-m"/></i>
        <b class="block fs-14 c-3 oneline mt-05">{{item.title}}</b>
        <span *ngIf="!item.rating.average" class="block fs-14 c-9 mt-05">暂无评分</span>
        <span *ngIf="item.rating.average" class="block fs-14 c-9 mt-05">{{item.rating.average}}分</span>
        <span *ngIf="item.casts && item.casts.length" class="block fs-14 c-9 mt-05">{{getCasts(item)}}</span>
        <span *ngIf="item.year" class="block fs-14 c-9 mt-05">{{item.year}}年</span>
      </el-card>
    </li>
  </ul>
  `
})

export class MovieListComponent{
  @Input() data;

  constructor(
    private DoubanService: DoubanService,
    private router: Router,
  ){} 

  getCasts(item){
    return item.casts.map((item,idx)=>item.name).join('/')
  }

  gotoDetail(id){
    this.router.navigate(["movie",id])
  }
}




