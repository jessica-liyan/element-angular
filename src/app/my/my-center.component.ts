import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { DoubanService } from './../douban.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {cities} from './cities';
 
@Component({
  template: `
    <div>
      <h2 class="sub-tit">我的中心</h2>
    </div>
  `
})

export class MyCenterComponent implements OnInit{
  cities = [];
  constructor(
    private DoubanService: DoubanService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ElementRef: ElementRef
  ){} 

  ngOnInit(){
  }
}




