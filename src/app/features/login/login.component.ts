import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { length, valid, errorMessages } from '../../shared/constants';
import { LoginHttpService } from '../../core/http/login-http.service';

const { required, minLength, maxLength, pattern } = Validators;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public errorMessages = errorMessages;
  public loginFail = '';
  public failCounts = 0;
  private subscription$: Subscription | null = null;

  constructor(
    private loginHttpService: LoginHttpService,
    private router: Router
  ) {}

  public login = new FormControl<string | null>('', [
    required,
    minLength(length.email.min),
    maxLength(length.email.max),
  ]);
  public password = new FormControl<string | null>('', [
    required,
    minLength(length.password.min),
    pattern(valid.password),
  ]);

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  public onSubmit(): void {
    const login = this.login.value || '';
    const password = this.password.value || '';

    const form = {
      login,
      password,
    };

    this.loginHttpService
      .login(form)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
          console.error(error);
          this.loginFail = 'login fails';
          this.failCounts += 1;

          if (this.failCounts === 3) {
            // TODO
          }
        },
      });
  }
}
