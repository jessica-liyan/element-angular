import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template:  `
    <div class="t-c">
      <img src="../assets/image/not-found.png" class="v-m"/>
      <p class="fs-14 c-6 mt-20">404-查找的页面不存在！</p>
    </div>
  `
})

export class PageNotFoundComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }
}