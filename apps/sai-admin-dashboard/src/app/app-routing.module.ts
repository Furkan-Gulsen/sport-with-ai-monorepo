import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaulLayoutComponent } from './containers/defaul-layout/defaul-layout.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthForChildsGuard } from './guards/auth-for-childs.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { P404Component } from './views/p404/p404.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '',
    component: DefaulLayoutComponent,
    canActivateChild: [AuthForChildsGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'social-media',
        loadChildren: () =>
          import('./views/social-media/social-media.module').then(
            (m) => m.SocialMediaModule
          ),
      },
      {
        path: 'sport',
        loadChildren: () =>
          import('./views/sport/sport.module').then((m) => m.SportModule),
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./views/activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./views/privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'logs',
        loadChildren: () =>
          import('./views/logs/logs.module').then((m) => m.LogsModule),
      },
    ],
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
