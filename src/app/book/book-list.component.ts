import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
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
  count: number; // 每页条数
  n: number; // 总页数

  selectedId: number;

  @ViewChild('list')
  listBlock: ElementRef

  constructor(
    private DoubanService: DoubanService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ElementRef: ElementRef
  ){} 
  
  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe(params => {
      this.index = +params.get('page')
      this.selectedId = +params.get('id')
      console.log(this.selectedId)
    })
  }

  ngAfterViewInit(){
    let w = this.listBlock.nativeElement.offsetWidth
    this.count = Math.floor(w/260)*4
    console.log(this.count)
    this.search()
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

  gotoDetail(id){
    this.router.navigate(["/book", id, {page: this.index}])
  }

  change(nextPage){
    console.log('change',nextPage)
    this.index = nextPage - 1
    this.search()
  }
}




