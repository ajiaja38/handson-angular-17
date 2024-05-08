import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'time-module',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Login Page Module',
        component: LoginComponent,
      },
      {
        path: 'register',
        title: 'Register Page Module',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        title: 'Forgot Password Page Module',
        component: ForgotPasswordComponent,
      },
      {
        path: 'time-module',
        title: 'Time Module',
        loadComponent: () =>
          import('./components/time/time.component').then(
            (m) => m.TimeComponent
          ),
      },
      {
        path: '**',
        title: 'Not Found Page Module',
        component: PageNotFoundComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
