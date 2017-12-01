import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';
import {DoubanService } from './../douban.service';
import { MovieTabListComponent } from './movie-tab-list.component';
 
@Component({
  selector: 'movie-tab',
  template: `
  <div class="midLayout">
    <el-menu theme="light" model="{{id}}" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="0"><a (click)="change(0)">正在热映</a></el-menu-item>
      <el-menu-item index="1"><a (click)="change(1)">即将上映</a></el-menu-item>
    </el-menu>
    <div *ngIf="id == 0">
      <movie-tab-list [data]="data0"></movie-tab-list>
      <div *ngIf="loading0" class="mt-10 mb-10">
        <div class="demo" [el-loading]="true">
          <el-tag>加载中..</el-tag>
        </div>
      </div>
      <div *ngIf="hasMore0" class="mt-10 mb-10">
        <el-button type="primary" plain="true" (click)="more()">显示更多</el-button>
      </div>
    </div>
    <div *ngIf="id == 1">
      <movie-tab-list [data]="data1"></movie-tab-list>
      <div *ngIf="loading1" class="mt-10 mb-10">
        <div class="demo" [el-loading]="true">
          <el-tag>加载中..</el-tag>
        </div>
      </div>
      <div *ngIf="hasMore1" class="mt-10 mb-10">
        <el-button type="primary" plain="true" (click)="more()">显示更多</el-button>
      </div>
    </div>
  `
})

// 分别保存每类的已加载数据和页数
export class MovieTabComponent implements OnInit{
  id: number;
  city = '武汉';

  data0 = [];
  idx0 = 0;
  n0: number; // 总页数
  count0: number = 20; // 每页条数
  loading0: boolean = true;
  hasMore0: boolean = false;

  data1 = [];
  idx1 = 0;
  n1: number; // 总页数
  count1: number = 20; // 每页条数
  loading1: boolean = true;
  hasMore1: boolean = false;

  constructor(
    private DoubanService: DoubanService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.fetchTheater()
    this.fetchComing()
    this.activatedRoute.paramMap
      .switchMap(params => params.get('id'))
      .subscribe(id => {
        this.id = +id
      })
  }

  fetchTheater(){
    this.DoubanService.getMovieInTheater(this.city,this.idx0 * this.count0, this.count0).subscribe((res)  => {
      console.log('fetch',res)
      this.n0 = Math.ceil(res["total"]/res["count"])
      this.data0 = this.data0.concat(res["subjects"])
      this.loading0 = false
      if(this.idx0 < this.n0 -1){
        this.idx0 ++;
        this.hasMore0 = true
      }else{
        this.hasMore0  = false
      }
    })
  }

  fetchComing(){
    this.DoubanService.getMovieInComing(this.idx1 * this.count1, this.count1).subscribe((res)  => {
      console.log('fetch',res)
      this.n1 = Math.ceil(res["total"]/res["count"])
      this.data1 = this.data1.concat(res["subjects"])
      this.loading1 = false
      if(this.idx1 < this.n1 -1){
        this.idx1 ++;
        this.hasMore1 = true
      }else{
        this.hasMore1  = false
      }
    })
  }

  change(idx){
    this.id = idx
  }

  more(){
    if(this.id == 0){
      this.loading0 = true;
      this.fetchTheater()
    }else{
      this.loading1 = true;
      this.fetchComing()
    }
  }
}




