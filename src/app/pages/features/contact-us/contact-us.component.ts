import { Component, OnInit } from '@angular/core';
import * as decode from 'jwt-decode';

@Component({
  selector: 'ngx-popovers',
  styleUrls: ['./contact-us.component.scss'],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent implements OnInit {

  name: string;
  email: string;
  phone: string;

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
