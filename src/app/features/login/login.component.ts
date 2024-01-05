import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { length, errorMessages, valid } from '../../shared/constants';
import { LoginHttpService } from '../../core/http/login-http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const { required, minLength, maxLength, pattern, email } = Validators;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [LoginHttpService]
})
export class LoginComponent implements OnDestroy {
  public errorMessages = errorMessages;
  public loginFail = '';
  public failCounts = 0;

  public showPassword = false;
  public showNextButton = true;

  private subscription$: Subscription | null = null;
  // private loginHttpService: LoginHttpService = inject(LoginHttpService);
  // private router: Router = inject(Router);

  constructor(
    private loginHttpService: LoginHttpService,
    private router: Router
  ) {}

  public login = new FormControl<string | null>('', [
    required,
    email,
    minLength(length.email.min),
    maxLength(length.email.max),
  ]);
  public password = new FormControl<string | null>('', [
    required,
    minLength(length.password.min),
    pattern(valid.password),
    maxLength(length.password.max),
  ]);
  public rememberMe = new FormControl<boolean>(false);

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  public toggleNext(): void {
    if (this.login.errors === null) {
      this.showNextButton = false;
    } else {
      this.showNextButton = true;
    }
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  public onLoginUpdate() {
    if (this.login.errors) {
      this.showNextButton = true;
      this.password.reset();
    }

    if ((event as KeyboardEvent).code === 'Enter') {
      this.toggleNext();
    }
  }

  public onPasswordUpdate() {
    if ((event as KeyboardEvent).code === 'Enter') {
      this.toggleNext();
    }
  }

  public onSubmit(): void {
    const login = this.login.value || '';
    const password = this.password.value || '';
    // const rememberMe = this.rememberMe.value;

    const form = {
      login,
      password,
      // rememberMe
    };

    this.loginHttpService
      .login(form)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.log(64, document.cookie);

          this.router.navigate(['/']);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
          console.error(error);

          // check if error due to invalid user's input?
          this.loginFail = 'Invalid login or password!';
          this.failCounts += 1;

          if (this.failCounts === 3) {
            // TODO
          }
        },
      });
  }
}
