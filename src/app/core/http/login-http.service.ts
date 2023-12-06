import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponseDTO } from '../../features/register/register.interface';

interface LoginDTO {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'any',
})
export class LoginHttpService {
  private path = '/api/v1/account/login';

  constructor(private readonly http: HttpClient) {}

  public login(form: LoginDTO): Observable<ApiResponseDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const result$ = this.http.post<ApiResponseDTO>(
      this.path,
      form,
      httpOptions
    );

    return result$;
  }
}
