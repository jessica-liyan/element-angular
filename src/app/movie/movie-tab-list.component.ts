import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';
import {DoubanService } from './../douban.service';
 
@Component({
  selector: 'movie-tab-list',
  template: `
  <ul class="listLine">
    <li *ngFor="let item of data" (click)="gotoDetail(item.id)">
      <el-card>
        <div el-row gutter="10">
          <div el-col span="4" *ngIf="item.images"><img src="{{item.images.small}}" class="w v-m"/></div>
          <div el-col span="20">
            <b class="block fs-14 c-3 oneline mt-05">{{item.title}}</b>
            <span *ngIf="item.rating.average" class="block fs-14 c-9 mt-05">{{item.rating.average}}分</span>
            <span *ngIf="item.casts && item.casts.length" class="block fs-14 c-9 mt-05">{{getCasts(item)}}</span>
            <span *ngIf="item.year" class="block fs-14 c-9 mt-05">{{item.year}}年</span>
          </div>
        </div> 
      </el-card>
    </li>
  </ul>
  `
})

export class MovieTabListComponent{
  @Input() data;

  constructor(
    private router: Router,
  ){} 

  getCasts(item){
    return item.casts.map((item,idx)=>item.name).join('/')
  }

  gotoDetail(id){
    this.router.navigate(["movie",id])
  }
}




