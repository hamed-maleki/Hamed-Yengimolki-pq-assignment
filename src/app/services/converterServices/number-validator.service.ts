import { Injectable } from '@angular/core';
import { FormControl, AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NumberValidatorService {

  public static numberValidator(input: FormControl): any {
    if (!input.value || !input.value.toString().trim()) {
      return null;
    }
    const inputValue = input.value.toString().trim();
    const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
    input.markAsTouched();
    if (NUMBER_REGEXP.test(inputValue)) {
      return null;
    }
    return {
      invalidNumber: true
    };
  }
}