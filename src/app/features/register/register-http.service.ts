import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterDTO, ApiResponseDTO } from './register.interface';

@Injectable({
  providedIn: 'any',
})
export class RegisterHttpService {
  private path = '/api/v1/account/register'; // '/api/v1/account';

  constructor(private readonly http: HttpClient) {}

  public register(form: RegisterDTO): Observable<ApiResponseDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
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
// const result$ = this.http.get(this.path);
// result$.subscribe((val) => console.log(19, val));
// return result$;

/* set header because httpOptions is immutable
        httpOptions.headers =
        httpOptions.headers.set('Authorization', 'my-new-auth-token');
    */
