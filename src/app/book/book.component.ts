import { Component } from '@angular/core';

@Component({
  template:  `
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `
})
export class BookComponent { }