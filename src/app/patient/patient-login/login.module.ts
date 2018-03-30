import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule,MatSelectModule,MatFormFieldModule,MatIconModule,MatSnackBarModule} from '@angular/material';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { PatientLoginService } from './login.service';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, MatInputModule,
        LoginRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ],
    declarations: [LoginComponent],
    providers: [PatientLoginService]
})
export class LoginModule {}
