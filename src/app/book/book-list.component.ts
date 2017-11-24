import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { DoubanService } from './../douban.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
 
@Component({
  templateUrl: './book-list.component.html'
})

export class BookListComponent implements OnInit{
  bookList = [];
  keyword: string= 'js'; // 默认搜索项
  total: number; // 总条数
  index: number; // 当前页数
  count: number = 10; // 每页条数
  n: number; // 总页数

  selectedId: number;

  constructor(
    private DoubanService: DoubanService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){} 
  
  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe(params => {
      this.index = +params.get('page')
      this.selectedId = +params.get('id')
      this.search()
      console.log(this.selectedId)
    })
  }

  search(){
    console.log(this.keyword)
    this.DoubanService.searchBook(this.keyword, this.index*this.count, this.count)
      .subscribe(res => {
        console.log(res)
        this.bookList = res["books"];
        this.total = res["total"];
        this.n = Math.ceil(this.total/this.count)
      })
  }

  prev(){
    this.index = this.index > 0 ? this.index - 1 : 0;
    this.search()
  }
  next(){
    this.index = this.index < this.n -1 ? this.index + 1 : this.n - 1;
    this.search()
  }
  home(){
    this.index = 0
    this.search()
  }
  end(){
    this.index = this.n - 1
    this.search()
  }
  gotoDetail(id){
    this.router.navigate(["/book", id, {page: this.index}])
  }
}




