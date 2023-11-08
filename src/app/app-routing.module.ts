import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './features/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    loadChildren: async () =>
      await import('./features/register/register.module').then(
        (m) => m.RegisterModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
