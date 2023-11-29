import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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
  public loginFail = '';

  constructor(
    private http: RegisterHttpService,
    private router: Router
  ) {}

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

    this.http
      .register(form)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error: Error) => console.log(error),
      });
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
