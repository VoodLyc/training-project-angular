import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-print-validation-error',
  templateUrl: './print-validation-error.component.html',
  styleUrls: ['./print-validation-error.component.css']
})
export class PrintValidationErrorComponent implements OnInit {
  @Input('control') control: AbstractControl

  ngOnInit(): void {
    console.log(this.control)
    console.log(Object.keys(this.control.errors))
  }

  getErrorMessage(errorKey: string): string {
    const errorMessages = {
      required: 'This field is required',
      maxlength: `The maximum length for this field is ${this.control.errors[errorKey].requiredLength}, but actual length is ${this.control.errors[errorKey].actualLength}`,
      duplicatedName: `A pokemon with the name "${this.control.value}" already exists, please choose a different name`
    }
    return errorMessages[errorKey] || 'Invalid value'
  }
}
