import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { ErrorsMessagePipe } from 'src/app/shared/pipes/errors-message.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterHttpService } from './register-http.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let registerHttpService: RegisterHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, ErrorsMessagePipe],
      imports: [SharedModule],
      providers: [
        { provide: RegisterHttpService, useClass: RegisterHttpService },
        { provide: Router, useClass: Router },
        provideHttpClient(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    registerHttpService = TestBed.inject(RegisterHttpService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RegisterHttpService method on register and redirect to /login on success response', async () => {
    const email = 'username@email.com';
    const password = 'somerandompassword';
    component.email.setValue(email);
    component.password.setValue(password);

    spyOn(registerHttpService, 'register').and.returnValues(
      of({
        ok: true,
        status: 201,
        message: 'account created',
        result: { id: 1 },
      })
    );
    spyOn(router, 'navigate').and.callFake(async () => true);

    component.onSubmit();

    expect(registerHttpService.register).toHaveBeenCalledWith({
      email,
      password,
      username: 'username-email-com',
      role: 'user',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call RegisterHttpService method on register and show email exists message when getting 409 Conflict error response', () => {
    const email = 'username@email.com';
    const password = 'somerandompassword';
    component.email.setValue(email);
    component.password.setValue(password);

    spyOn(registerHttpService, 'register').and.returnValue(
      throwError(
        new Error(
          'Http failure response for http://localhost:4200/api/v1/account/register: 409 Conflict'
        )
      )
    );
    component.onSubmit();

    expect(component.registerFail).toBeTruthy();
  });
});
