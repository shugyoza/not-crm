import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterDTO, ApiResponseDTO } from './register.interface';

@Injectable({
  providedIn: 'any',
})
export class RegisterHttpService {
  private path = '/api/v1/account/register';

  constructor(private readonly http: HttpClient) {}

  public register(form: RegisterDTO): Observable<ApiResponseDTO> {
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
