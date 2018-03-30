import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule,MatSelectModule,MatFormFieldModule,MatIconModule,MatSnackBarModule} from '@angular/material';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterLoginService } from './register.service';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [CommonModule, MatInputModule,
        RegisterRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ],
    declarations: [RegisterComponent],
    providers: [RegisterLoginService]
})
export class RegisterModule {}
