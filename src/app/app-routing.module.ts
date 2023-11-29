import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './features/register/register.component';

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
    // temporary, will be replaced when login module has been developed
    path: 'login',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
