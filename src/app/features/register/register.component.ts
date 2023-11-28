import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { length, valid, errorMessages } from '../../shared/constants';
import { RegisterHttpService } from './register-http.service';

const { required, minLength, maxLength, pattern } = Validators;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public errorMessages = errorMessages;

  constructor(private http: RegisterHttpService) {}

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
    const { username, email, password } = this.register.value;

    if (!username || !email || !password) {
      return;
    }

    const form = {
      email,
      username,
      password,
      role: 'user',
    };

    console.log(form);
    this.http.register(form);
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
