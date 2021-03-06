import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { DashAuthGuard } from './shared/guard/dashauth.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginAuthGuard } from './shared/guard/loginauth.guard';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [DashAuthGuard] },
  { path: 'dentist-pages', loadChildren: 'app/dentist-page/dentist-pages.module#DentistPagesModule'},
  { path: 'admin/dentist/login', loadChildren: 'app/dentists/dentist-login/dentist-login.module#DentistLoginModule'},
  { path: 'login/patient', loadChildren: 'app/patient/patient-login/login.module#LoginModule', canActivate: [LoginAuthGuard] },
  { path: 'register/patient', loadChildren: 'app/patient/patient-register/register.module#RegisterModule' },
  { path: 'patient/detail', loadChildren: 'app/patient/patient-information/patient-info.module#PatientInfoModule', canActivate: [AuthGuard] },
  { path: 'verify_email', loadChildren: 'app/patient/appointment-confirmed/confirmed.module#VerifyModule' },
  { path: 'selection', loadChildren: 'app/landing-page/category.module#CategoryModule' },
  /*{
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },*/
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'login/patient' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
