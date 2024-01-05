import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { ErrorsMessagePipe } from 'src/app/shared/pipes/errors-message.pipe';
import { LoginHttpService } from '../../core/http/login-http.service';
import { provideHttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loginHttpService: LoginHttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [LoginComponent],
      providers: [
        { provide: LoginHttpService, useClass: LoginHttpService },
        { provide: Router, useClass: Router },
        provideHttpClient(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    loginHttpService = TestBed.inject(LoginHttpService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call LoginHttpService method on login and redirect to /profile on success response', () => {
    const email = 'username@email.com';
    const password = 'somerandompassword';
    component.login.setValue(email);
    component.password.setValue(password);

    spyOn(loginHttpService, 'login').and.returnValues(
      of({
        ok: true,
        status: 200,
        message: 'account created',
        result: { id: 1 },
      })
    );
    spyOn(router, 'navigate').and.callFake(async () => true);

    component.onSubmit();

    expect(loginHttpService.login).toHaveBeenCalledWith({
      login: email,
      password,
    });
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call LoginHttpService method on login and show email exists message when getting 409 Conflict error response', () => {
    const email = 'username@email.com';
    const password = 'somerandompassword';
    component.login.setValue(email);
    component.password.setValue(password);

    spyOn(loginHttpService, 'login').and.returnValue(
      throwError(
        new Error(
          'Http failure response for http://localhost:4200/api/v1/account/login: 409 Conflict'
        )
      )
    );
    component.onSubmit();

    expect(component.loginFail).toBeTruthy();
  });
});
