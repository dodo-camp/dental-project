import { Component, OnInit } from '@angular/core';
import {
  NgxPopoverCardComponent, NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from './popover-examples.component';
import * as decode from 'jwt-decode';

@Component({
  selector: 'ngx-popovers',
  styleUrls: ['./popovers.component.scss'],
  templateUrl: './popovers.component.html',
})
export class PopoversComponent implements OnInit {

  name: string;
  email: string;
  phone: string;

  tabsComponent = NgxPopoverTabsComponent;
  cardComponent = NgxPopoverCardComponent;
  formComponent = NgxPopoverFormComponent;

  ngOnInit() {
    if (localStorage.getItem('infoToken') != null) {
      const token = localStorage.getItem('infoToken');
      const tokenPayload = decode(token);
      this.name = tokenPayload.firstname + ' ' + tokenPayload.lastname;
      this.email = tokenPayload.email;
      this.phone = tokenPayload.mobile_number;
    }
  }

}
