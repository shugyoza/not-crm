import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { length, valid, errorMessages } from '../../shared/constants';
import { RegisterHttpService } from './register-http.service';

const { required, minLength, maxLength, pattern } = Validators;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public errorMessages = errorMessages;
  loginFail = '';
  private subscription$: Subscription | null = null;

  constructor(
    private registerHttpService: RegisterHttpService,
    private router: Router
  ) {}

  public email = new FormControl<string | null>('', [
    required,
    minLength(length.email.min),
    maxLength(length.email.max),
    pattern(valid.email),
  ]);
  public password = new FormControl<string | null>('', [
    required,
    minLength(length.password.min),
    pattern(valid.password),
  ]);
  public confirmPassword = new FormControl<string | null>('', [required]);

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  public onSubmit(): void {
    const email = this.email.value || '';
    const password = this.password.value || '';

    const regex = /[@\.]/gi;
    const username = email.replace(regex, '-');

    const form = {
      email,
      username,
      password,
      role: 'user',
    };

    this.registerHttpService
      .register(form)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
          if (error.message.indexOf('409 Conflict')) {
            this.loginFail = 'email exists';
          } else {
            this.loginFail = 'something is wrong';
          }
        },
      });
  }
}
