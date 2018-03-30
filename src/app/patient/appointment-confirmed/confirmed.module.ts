import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyRoutingModule } from './confirmed-routing.module';
import { VerifyComponent } from './confirmed.component';

@NgModule({
    imports: [CommonModule,VerifyRoutingModule
    ],
    declarations: [VerifyComponent],
    providers: []
})
export class VerifyModule { }
