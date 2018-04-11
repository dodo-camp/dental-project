import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  ngOnInit() {
    localStorage.removeItem('jwtToken');
    localStorage.setItem('dentist-token','true');
  }
  menu = MENU_ITEMS;
}
