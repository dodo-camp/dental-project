import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
    imports: [
        CommonModule,
        CategoryRoutingModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
    ],
    declarations: [CategoryComponent]
})
export class CategoryModule { }
