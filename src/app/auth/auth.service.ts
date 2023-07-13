import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { authReponseData } from './auth.model';
import { User } from '../shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  readonly API_KEY = 'AIzaSyCXs0MoZt2mSpn7JB4zy9u5GY7XsmmHA3U'
  errorMessages = {
    EMAIL_EXISTS: 'This email is associated with an existing user, please use another email',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Unusual activity detected. Try again later',
    EMAIL_NOT_FOUND: 'Invalid credentials. Please try again',
    INVALID_PASSWORD: 'Invalid credentials. Please try again',
    USER_DISABLED: 'This user has been disabled, please create another account'
  }
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<authReponseData> {
    return this.http.post<authReponseData>(`${this.BASE_URL}signUp?key=${this.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(errorRes => {
          return this.handleError(errorRes)
        })
      )
  }

  logIn(email: string, password: string): Observable<authReponseData> {
    return this.http.post<authReponseData>(`${this.BASE_URL}signInWithPassword?key=${this.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(errorRes => {
          return this.handleError(errorRes)
        }),
        tap(responseData => {
          this.handleAuthentication(responseData.localId, responseData.email, responseData.idToken, +responseData.expiresIn)
        })
      )
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage))
    }
    else {
      errorMessage = this.errorMessages[errorRes.error.error.message]
    }
    return throwError(() => new Error(errorMessage))
  }

  private handleAuthentication(id: string, email: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(id, email, token, expirationDate)
    this.user.next(user)
  }

  getUser(): Observable<User> {
    return this.user.asObservable()
  }
}
