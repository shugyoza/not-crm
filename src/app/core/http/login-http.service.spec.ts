import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { LoginHttpService } from './login-http.service';

describe('LoginHttpService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpHandler: HttpHandler;
  let httpClient: HttpClient;
  let loginHttpService: LoginHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LoginHttpService, useClass: LoginHttpService },
        HttpClient,
        HttpHandler,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    httpHandler = TestBed.inject(HttpHandler);
    httpClient = TestBed.inject(HttpClient);
    loginHttpService = TestBed.inject(LoginHttpService);
  });

  it('should create', () => {
    expect(loginHttpService).toBeTruthy();
  });

  it('should call RegisterHttpService method on register and redirect to /login on success response', async () => {
    const form = {
      login: 'username@email.com',
      password: 'somerandompassword',
    };
    spyOn(httpClient, 'post');

    loginHttpService.login(form);

    expect(httpClient.post).toHaveBeenCalledTimes(1);
  });
});
