import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputFieldComponent } from './input-field.component/input-field.component';

@NgModule({
  declarations: [InputFieldComponent],
  imports: [CommonModule],
  exports: [InputFieldComponent],
})
export class SharedModule {}
