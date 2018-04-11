import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule,MatSelectModule,MatFormFieldModule,MatIconModule,MatSnackBarModule} from '@angular/material';

import { DentistLoginRoutingModule } from './dentist-routing.module';
import { DentistLoginComponent } from './dentist-login.component';

@NgModule({
    imports: [CommonModule, MatInputModule,
        DentistLoginRoutingModule,
        MatSelectModule,
        MatIconModule,
        MatSnackBarModule,
        ],
    declarations: [DentistLoginComponent],
})
export class DentistLoginModule {}
