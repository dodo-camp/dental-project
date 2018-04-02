import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
export const MY_NATIVE_FORMATS = {
    fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
    timePickerInput: { hour: 'numeric', minute: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
};
import { profileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [
        profileRoutingModule,
        CommonModule, MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        HttpModule,
        NgbModule.forRoot(),
        MatSnackBarModule,
        FormsModule,
    ],
    declarations: [ProfileComponent],
})
export class ProfileModule { }