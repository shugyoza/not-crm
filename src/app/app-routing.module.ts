import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
