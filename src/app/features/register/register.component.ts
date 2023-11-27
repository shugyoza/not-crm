import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { length, valid, errorMessages } from '../../shared/constants';

const { required, minLength, maxLength, pattern } = Validators;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public errorMessages = errorMessages;

  public register = new FormGroup({
    email: new FormControl('', [
      required,
      minLength(length.email.min),
      maxLength(length.email.max),
      pattern(valid.email),
    ]),
    username: new FormControl('', [
      required,
      minLength(length.username.min),
      maxLength(length.username.max),
      pattern(valid.username),
    ]),
    role: new FormControl({ value: 'user', disabled: true }),
    password: new FormControl('', [
      required,
      minLength(length.password.min),
      pattern(valid.password),
    ]),
    confirmPassword: new FormControl('', [required]),
  });

  public onSubmit(): void {
    console.log(this.register.value);
  }

  get email() {
    return this.register.get('email');
  }

  get username() {
    return this.register.get('username');
  }

  get password() {
    return this.register.get('password');
  }

  get confirmPassword() {
    return this.register.get('confirmPassword');
  }
}
