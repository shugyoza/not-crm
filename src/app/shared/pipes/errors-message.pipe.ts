import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorsMessagePipe',
})
export class ErrorsMessagePipe implements PipeTransform {
  transform(
    value: ValidationErrors | null | undefined,
    messages: { [key: string]: string }
  ): string {
    if (!value) {
      return '';
    }

    const errors = Object.keys(value);
    const display = errors[0];

    return messages[display];
  }
}
