import { Component, OnInit, HostBinding} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DoubanService } from './../douban.service';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import {slideInDownAnimation} from '../animation';

@Component({
  selector: 'book-detail',
  animations: [slideInDownAnimation],
  template: `
    <el-button type="primary" plain="true" icon="arrow-left" (click)="goBack(book)">返回</el-button>
    <div class="midLayout">
      <h2>{{book.title}}</h2>
      <el-card>
        <div class="row w">
          <div class="col v-t" style="width:200px;">
            <img src="{{book.image}}"/>
          </div>
          <div class="col v-t fs-14 c-3 lh-20">
            <p *ngIf="book.author && book.author.length">作者：<i class="c-9">{{book.author.join('/')}}</i></p>
            <p *ngIf="book.publisher">出版社：<i class="c-9">{{book.publisher}}</i></p>
            <p *ngIf="book.subtitle">副标题：<i class="c-9">{{book.subtitle}}</i></p>
            <p *ngIf="book.origin_title">原作名：<i class="c-9">{{book.origin_title}}</i></p>
            <p *ngIf="book.translator && book.translator.length">译者：<i class="c-9">{{book.translator.join('/')}}</i></p>
            <p *ngIf="book.pubdate">出版年：<i class="c-9">{{book.pubdate}}</i></p>
            <p *ngIf="book.pages">页数：<i class="c-9">{{book.pages}}</i></p>
            <p *ngIf="book.price">定价：<i class="c-9">{{book.price}}</i></p>
            <p *ngIf="book.binding">装帧：<i class="c-9">{{book.binding}}</i></p>
            <p *ngIf="book.series">丛书：<i class="c-9">{{book.series.title}}</i></p>
            <p *ngIf="book.isbn13">ISBN：<i class="c-9">{{book.isbn13}}</i></p>
          </div>
        </div>
        <h3 class="fs-16 c-3 mt-20 mb-10">作者简介</h3>
        <p class="fs-14 c-6 lh-20" *ngIf="book.author_intro">{{book.author_intro}}</p>
        <p class="fs-14 c-6 lh-20" *ngIf="!book.author_intro">暂无简介</p>
        <h3 class="fs-16 c-3 mt-20 mb-10">内容简介</h3>
        <p class="fs-14 c-6 lh-20" *ngIf="book.summary">{{book.summary}}</p>
        <p class="fs-14 c-6 lh-20" *ngIf="!book.summary">暂无简介</p>
        <h3 class="fs-16 c-3 mt-20 mb-10">目录</h3>
        <p class="fs-14 c-6 lh-20" style="white-space:pre;" *ngIf="book.catalog">{{book.catalog}}</p>
        <p class="fs-14 c-6 lh-20" *ngIf="!book.catalog">暂无目录</p>
      </el-card>      
    </div>
  `
})

export class BookDetailComponent implements OnInit{
  book = {};
  page: number;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  @HostBinding('style.left')  left = '0px';
  @HostBinding('style.right')  right = '0px';

  constructor(
    private DoubanService: DoubanService,
    private router: Router,
    private location: Location,
    private activatedRoute:ActivatedRoute,
    private title: Title
  ){} 
  
  ngOnInit():void{
    this.activatedRoute.paramMap
      .switchMap(params => {
        this.page = +params.get('page');
        return this.DoubanService.getBookDetail(params.get('id'))
      }).subscribe(res => {
        this.book = res
        this.title.setTitle(this.book["title"])
      })
  }

  goBack(book):void{
    // this.location.back()
    let bookId = book ? book.id : null;
    this.router.navigate(["../", {id: bookId, page: this.page}],{relativeTo: this.activatedRoute})
  }
}




