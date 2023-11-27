import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorsMessagePipe',
})
export class ErrorsMessagePipe implements PipeTransform {
  transform(value: any, messages: any): string {
    if (!value) {
      return '';
    }

    const errors = Object.keys(value);
    const display = errors[0];

    return messages[display];
  }
}
