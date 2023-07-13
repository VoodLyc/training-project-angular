import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { authReponseData } from './auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true
  isLoginModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(true)
  authForm: FormGroup


  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  onSwitchMode(): void {
    this.isLoginModeSubject.next(!this.isLoginModeSubject.value)
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
    this.isLoginModeSubject.subscribe(
      (isLoginMode: boolean) => {
        this.isLoginMode = isLoginMode
        this.switchValidators()
      }
    )
  }

  switchValidators(): void {
    this.authForm.reset()
    let emailControl = this.authForm.get('email')
    let passwordControl = this.authForm.get('password')
    if (this.isLoginMode) {
      emailControl.setValidators([Validators.required, Validators.email])
      passwordControl.setValidators(Validators.required)
    }
    else {
      emailControl.setValidators([Validators.required, Validators.email, Validators.maxLength(50)])
      passwordControl.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(50)])
    }
  }

  onSubmit(): void {
    const email = this.authForm.value['email']
    const password = this.authForm.value['password']
    if (this.isLoginMode) {
      this.logIn(email, password)
    }
    else {
      this.signUp(email, password)
    }
    this.authForm.reset()
  }


  signUp(email: string, password: string) {
    this.authService.signUp(email, password).subscribe({
      next: () => {
        this.toastr.success(`You registered successfully`, 'Registered!', { timeOut: 5000 });
      },
      error: (errorMessage: Error) => {
        this.toastr.error(errorMessage.message, 'Error', { timeOut: 5000 })
      }
    })
  }

  logIn(email: string, password: string) {
    this.authService.logIn(email, password).subscribe({
      next: (authReponse: authReponseData) => {
        this.router.navigate(['pokemon', 'view', '25'])
      },
      error: (errorMessage: Error) => {
        this.toastr.error(errorMessage.message, 'Error', { timeOut: 5000 })
      }
    })
  }
}
