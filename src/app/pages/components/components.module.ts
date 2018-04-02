import { NgModule } from '@angular/core';

import { TreeModule } from 'ng2-tree';
import { ToasterModule } from 'angular2-toaster';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ChatService } from './chat/chat.service';
import { ComponentsRoutingModule, routedComponents } from './components-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ComponentsRoutingModule,
    TreeModule,
    ToasterModule,
    HttpModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [ChatService,{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class ComponentsModule { }
