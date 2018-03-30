import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientInfoComponent } from './patient-info.component';

const routes: Routes = [
    {
        path: '',
        component: PatientInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientInfoRoutingModule {}
