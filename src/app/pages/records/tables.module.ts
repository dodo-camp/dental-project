import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { HistoryService } from './appointment-history/smart-table.service';

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    HistoryService
  ],
})
export class TablesModule { }
