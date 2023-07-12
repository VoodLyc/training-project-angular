import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-print-validation-error',
  templateUrl: './print-validation-error.component.html',
  styleUrls: ['./print-validation-error.component.css']
})
export class PrintValidationErrorComponent {
  @Input('control') control: AbstractControl

  getErrorMessage(errorKey: string): string {
    const errorMessages = {
      required: 'This field is required',
      max: `The maximum value for this field is **${this.control.errors[errorKey].max}**`,
      min: `The minimum value for this field is **${this.control.errors[errorKey].min}**`,
      maxlength: `The maximum length for this field is **${this.control.errors[errorKey].requiredLength}**, but actual length is **${this.control.errors[errorKey].actualLength}**`,
      minlength: `The minimum length for this field is **${this.control.errors[errorKey].requiredLength}**, but actual length is **${this.control.errors[errorKey].actualLength}**`,
      email: 'A valid email is required',
      duplicatedName: `A pokemon with the name **${this.control.value?.toString()?.toLowerCase()}** already exists, please choose a different name`,
      overweight: `The pokemon is overweight, actual BMI: **${this.control.errors[errorKey].actualBmi}**`,
      minExperience: `The minimum value when the pokemon is of type **Dragon** is **500**`
    }
    return errorMessages[errorKey] || 'Invalid value'
  }
}
