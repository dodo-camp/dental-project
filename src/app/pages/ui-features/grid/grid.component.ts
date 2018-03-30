import { Component, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'ngx-grid',
  styleUrls: ['./grid.component.scss'],
  templateUrl: './grid.component.html',
})
export class GridComponent {
  @ViewChild('myModal') myModal: any;
  backDisable = false;
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }
}
