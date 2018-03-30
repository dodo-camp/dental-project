import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule,MatSelectModule,MatFormFieldModule,MatIconModule,MatSnackBarModule} from '@angular/material';
import { LoadingModule ,ANIMATION_TYPES } from 'ngx-loading';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    NgbModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  })
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
