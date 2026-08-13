import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator = (controlName: string, matchingControlName: string) => (
control: AbstractControl
  ): ValidationErrors | null => {
    return control.value[controlName] === control.value[matchingControlName]
      ? null
      : { PasswordNoMatch: true };
  };