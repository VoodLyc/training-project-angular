import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { authReponseData } from './auth.model';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  errorMessages = {
    EMAIL_EXISTS: 'This email is associated with an existing user, please use another email',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Unusual activity detected. Try again later',
    EMAIL_NOT_FOUND: 'Invalid credentials. Please try again',
    INVALID_PASSWORD: 'Invalid credentials. Please try again',
    USER_DISABLED: 'This user has been disabled, please create another account'
  }
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string): Observable<authReponseData> {
    return this.http.post<authReponseData>(`${this.BASE_URL}signUp?key=${environment.FIRE_BASE_API_KEY}`,
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
    return this.http.post<authReponseData>(`${this.BASE_URL}signInWithPassword?key=${environment.FIRE_BASE_API_KEY}`,
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

  autoLogIn(): void {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData) {
      const user = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate))
      if (user.token) {
        this.user.next(user)
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.autoLogOut(expirationDuration)
      }
    }
  }

  logOut(): void {
    this.user.next(null)
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
    this.router.navigate(['auth'])
  }

  autoLogOut(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut()
    }, expirationDuration)
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

  private handleAuthentication(id: string, email: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(id, email, token, expirationDate)
    localStorage.setItem('userData', JSON.stringify(user))
    this.user.next(user)
    this.autoLogOut(expiresIn * 1000)
  }

  getUser(): Observable<User> {
    return this.user.asObservable()
  }
}
