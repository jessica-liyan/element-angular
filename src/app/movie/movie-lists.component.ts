import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';
import {DoubanService } from './../douban.service';
 
@Component({
  selector: 'movie-lists',
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
  <div *ngIf="loading" class="mt-10 mb-10">
    <div class="demo" [el-loading]="true">
      <el-tag>加载中..</el-tag>
    </div>
  </div>
  <div *ngIf="hasMore" class="mt-10 mb-10">
    <el-button type="primary" plain="true" (click)="more()">显示更多</el-button>
  </div>
  `
})

// 两个列表公用一个data数组和index
export class MovieListsComponent implements OnInit{
  data = [];
  city = '武汉';
  id: number;
  n: number; // 总页数
  index: number = 0; // 当前页数
  count: number = 20; // 每页条数
  loading: boolean = true;
  hasMore: boolean = false;

  constructor(
    private DoubanService: DoubanService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ){} 

  ngOnInit(){
    this.activatedRoute.paramMap
      .switchMap(params => params.get('id'))
      .subscribe(res => {
        this.id = +res;
        this.index = 0;
        this.data = [];
        this.loading = true;
        this.fetch()
      })
  }

  fetch(){
    switch(this.id){
      case 0:
      this.DoubanService.getMovieInTheater(this.city,this.index*this.count, this.count).subscribe((res)  => {
        console.log('fetch',res)
        this.n = Math.ceil(res["total"]/res["count"])
        this.data = this.data.concat(res["subjects"])
        this.changeStatus()
      })
      break;
      case 1:
      this.DoubanService.getMovieInComing(this.index*this.count, this.count).subscribe((res)  => {
        console.log('fetch',res)
        this.n = Math.ceil(res["total"]/res["count"])
        this.data = this.data.concat(res["subjects"])
        this.changeStatus()
      })
      break;
    }
  }

  // loading和hasMore状态的改变
  changeStatus(){
    this.loading = false
    if(this.index < this.n -1){
      this.index++;
      this.hasMore = true
    }else{
      this.hasMore = false
    }
  }

  more(){
    this.loading = true;
    this.fetch()
  }

  getCasts(item){
    return item.casts.map((item,idx)=>item.name).join('/')
  }

  gotoDetail(id){
    this.router.navigate(["movie",id])
  }
}




