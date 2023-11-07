import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'src/app/shared/shared.module'

import { RegisterComponent } from './register.component'

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, SharedModule]
})
export class RegisterModule {}
