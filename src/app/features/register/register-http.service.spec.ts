import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RegisterHttpService } from './register-http.service';

describe('RegisterHttpService', () => {
  let httpHandler: HttpHandler;
  let httpClient: HttpClient;
  let registerHttpService: RegisterHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RegisterHttpService, useClass: RegisterHttpService },
        HttpClient,
        HttpHandler,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    httpHandler = TestBed.inject(HttpHandler);
    httpClient = TestBed.inject(HttpClient);
    registerHttpService = TestBed.inject(RegisterHttpService);
  });

  it('should create', () => {
    expect(registerHttpService).toBeTruthy();
  });

  it('should call RegisterHttpService method on register and redirect to /login on success response', async () => {
    const form = {
      email: 'username@email.com',
      username: 'username-email-com',
      password: 'somerandompassword',
      role: 'user',
    };
    spyOn(httpClient, 'post');

    registerHttpService.register(form);

    expect(httpClient.post).toHaveBeenCalledTimes(1);
  });
});
