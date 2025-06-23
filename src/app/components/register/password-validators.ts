import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordHasNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && !/\d/.test(value)) {
    return { noNumber: 'La contraseña debe tener al menos un numero' };
  }
  return null;
}

export function passwordMinLengthValidator(minLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value.length < minLength) {
      return { minLength: { requiredLength: minLength, actualLength: value.length, message: `La contrasena debe tener al menos ${minLength} caracteres` } };
    }
    return null;
  };
}
