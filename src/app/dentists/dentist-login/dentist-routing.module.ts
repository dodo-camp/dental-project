import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DentistLoginComponent } from './dentist-login.component';

const routes: Routes = [
    {
        path: '',
        component: DentistLoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DentistLoginRoutingModule {}
