import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginHttpService } from '../../core/http/login-http.service';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update .showNextButton when .toggleNext() got called with invalid login input', () => {
    component.login.setValue('');
    component.toggleNext();

    expect(component.showNextButton).toBe(true);
  });

  it('should update .showNextButton to false when .toggleNext() got called with valid login input', () => {
    component.login.setValue('something@email.com');
    component.toggleNext();

    expect(component.showNextButton).toBe(false);
  });

  it('should toggle .showPassword value when .togglePassword() got called', () => {
    component.showPassword = false;
    component.togglePassword();

    expect(component.showPassword).toBe(true);
  });

  it('should set .showNextButton as true and call password.reset() when .onLoginUpdate got called with invalid login input', () => {
    component.login.setValue('');

    spyOn(component.password, 'reset').and.callThrough();

    component.onLoginUpdate();

    expect(component.showNextButton).toBe(true);
    expect(component.password.reset).toHaveBeenCalledTimes(1);
  });

  it('should call .toggleNext when .onLoginUpdate got called with KeyboardEvent triggered by Enter key pressing', () => {
    component.login.setValue('something@email.com');
    const loginInput = fixture.debugElement.query(By.css('input#input-login'))
      .nativeElement as HTMLInputElement;

    spyOn(component, 'onLoginUpdate').and.callThrough();
    spyOn(component, 'toggleNext').and.callThrough();

    loginInput.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }));

    expect(component.onLoginUpdate).toHaveBeenCalledTimes(1);
    expect(component.toggleNext).toHaveBeenCalledTimes(1);
  });
});
