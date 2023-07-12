import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { authReponseData } from './auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'https://identitytoolkit.googleapis.com/v1/'
  readonly API_KEY = 'AIzaSyCXs0MoZt2mSpn7JB4zy9u5GY7XsmmHA3U'
  errorMessages = {
    EMAIL_EXISTS: 'This email is associated with an existing user, please use another email',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Unusual activity detected. Try again later'
  }

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<authReponseData> {
    return this.http.post<authReponseData>(`${this.BASE_URL}accounts:signUp?key=${this.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(errorRes => {
          let errorMessage = 'An error occurred'
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMessage))
          }
          else {
            errorMessage = this.errorMessages[errorRes.error.error.message]
          }
          return throwError(() => new Error(errorMessage))
        })
      )
  }
}
