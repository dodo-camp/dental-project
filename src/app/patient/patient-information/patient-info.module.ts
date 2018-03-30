import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
//import { LoadingModule ,ANIMATION_TYPES } from 'ngx-loading';
import { PatientInfoRoutingModule } from './patient-info.routing.module';
import { PatientInfoService } from './patient-info.service';
import { PatientInfoComponent } from './patient-info.component';
export const MY_NATIVE_FORMATS = {
    fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
    timePickerInput: { hour: 'numeric', minute: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
};

@NgModule({
    imports: [CommonModule, MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        HttpModule,
        NgbModule.forRoot(),
        MatSnackBarModule,
        PatientInfoRoutingModule, FormsModule,
    ],
    declarations: [PatientInfoComponent,FileSelectDirective],
    providers: [PatientInfoService]
})
export class PatientInfoModule { }
