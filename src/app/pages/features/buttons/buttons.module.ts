import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { ModalGalleryModule } from 'angular-modal-gallery';
import { ButtonsComponent } from "./buttons.component";


@NgModule({
  imports: [
    ThemeModule,
    ModalGalleryModule.forRoot()
  ],
  declarations: [
    ButtonsComponent    
  ],
  providers: [],
})
export class ButtonsModule { }
