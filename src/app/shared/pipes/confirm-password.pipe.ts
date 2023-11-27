import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'confirmPasswordPipe',
})
export class ConfirmPasswordPipe implements PipeTransform {
  transform(
    value: any,
    password?: string | null,
    confirmPassword?: string | null
  ) {
    if (value || !password || !confirmPassword) {
      return '';
    }

    // if there is no more error message from the previous pipe, then evaluate and confirm
    return password === confirmPassword
      ? 'password confirmed'
      : 'password not confirmed';
  }
}
