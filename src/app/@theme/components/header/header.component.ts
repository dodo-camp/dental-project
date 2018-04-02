import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NotificationService } from './header.service';

import * as decode from 'jwt-decode';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @ViewChild('actionToDo') actionToDo: any;
  @Input() position = 'normal';
  imagePath: string;
  user: any;
  name: string;
  count = 0;
  count_2 = 0;
  show = false;
  ELEMENT_DATA = [];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private router: Router,
    private notify_service: NotificationService) {
  }
  ngOnInit() {
    this.notify_service.get_history_data(this.count);
    this.notify_service.data_subject.subscribe(data => {
      if (data.length != 0) {
        this.show = true;
      }
      this.ELEMENT_DATA = data
      this.ELEMENT_DATA = this.ELEMENT_DATA.reverse();
      this.ELEMENT_DATA.forEach(element => {
        if (element.notify == false) {
          this.count++;
          this.count_2++;
        }
      })
    });
    setInterval(() => {
      this.notify_service.get_history_data(this.count);
    }, 10000);

    if (localStorage.getItem('infoToken') != null) {
      const token = localStorage.getItem('infoToken');
      const tokenPayload = decode(token);
      this.name = tokenPayload.firstname;
      this.imagePath = tokenPayload.image.substring(21);
    }

  }

  badgeOff() {
    this.count_2 = 0;
  }

  onLoggedout() {
    this.router.navigate(['/login/patient']);
    localStorage.removeItem('infoToken');
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  ToProfile() {
    this.router.navigate(['/pages/profile']);
  }
}


export interface Element {
  department: string;
  date: { year: string, month: string, day: string };
  time: { hour: string, minute: string, second: string };
}
