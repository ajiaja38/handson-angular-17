import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { AboutComponent } from './components/home/about/about.component';
import { ContactComponent } from './components/home/contact/contact.component';
import { SignalComponent } from './components/home/signal/signal.component';
import { DemoComponent } from './components/demo/demo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home/:id',
    title: 'App Home Page',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivateChild: [authGuard],
    children: [
      {
        path: 'about',
        title: 'About',
        component: AboutComponent,
      },
      {
        path: 'contact',
        title: 'Contact',
        component: ContactComponent,
      },
      {
        path: 'signal',
        title: 'Signal',
        component: SignalComponent,
      },
    ],
  },
  {
    path: 'user',
    title: 'User',
    loadComponent: () =>
      import('./components/user/user.component').then((m) => m.UserComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    title: 'Login Page',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canDeactivate: [authGuard],
  },
  {
    path: 'directive',
    title: 'Directive Page',
    loadComponent: () =>
      import('./components/directive/directive.component').then(
        (m) => m.DirectiveComponent
      ),
  },
  {
    path: 'auth',
    title: 'Auth Page',
    loadChildren: () =>
      import('./modules/auth/auth.routing.module').then(
        (m) => m.AuthRoutingModule
      ),
  },
  {
    path: 'demo',
    title: 'Demo Page',
    component: DemoComponent,
  },
  {
    path: '**',
    title: 'Not Found Page',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
