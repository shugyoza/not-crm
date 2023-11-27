import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputFieldComponent } from './input-field.component/input-field.component';
import { ConfirmPasswordPipe } from './pipes/confirm-password.pipe';
import { ErrorsMessagePipe } from './pipes/errors-message.pipe';

@NgModule({
  declarations: [InputFieldComponent, ErrorsMessagePipe, ConfirmPasswordPipe],
  imports: [CommonModule],
  exports: [InputFieldComponent, ErrorsMessagePipe, ConfirmPasswordPipe],
})
export class SharedModule {}
