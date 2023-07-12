import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true
  isLoginModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(true)
  authForm: FormGroup

  onSwitchMode() {
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

  switchValidators() {
    this.authForm.reset()
    let emailControl = this.authForm.get('email')
    let passwordControl = this.authForm.get('password')
    if (this.isLoginMode) {
      emailControl.setValidators(Validators.required)
      passwordControl.setValidators(Validators.required)
    }
    else {
      emailControl.setValidators([Validators.required, Validators.maxLength(50)])
      passwordControl.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(50)])
    }
  }
}
