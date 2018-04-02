import { Component, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MatCell, MatTable, MatCellDef, MatHeaderCell } from '@angular/material/table';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HistoryService } from './smart-table.service';

//import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent implements OnInit {
  displayedColumns = ['position', 'department', 'date', 'time', 'symptom'];

  dataSource: MatTableDataSource< Element >;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private historyService: HistoryService) {

  }

  ngOnInit() {
    this.historyService.get_history_data();
    this.historyService.data_subject.subscribe(data => {
      this.dataSource = new MatTableDataSource<Element>(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}

export interface Element {
  department: string;
  date: { year: string, month: string, day: string };
  time: { hour: string, minute: string, second: string };
  symptom: string;
}
