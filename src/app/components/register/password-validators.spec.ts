import { passwordHasNumberValidator, passwordMinLengthValidator } from './password-validators';
import { FormControl } from '@angular/forms';

describe('Password Validators', () => {
  it('debería retornar error si la contraseña no contiene un número', () => {
    const control = new FormControl('abcdefg');
    expect(passwordHasNumberValidator(control)).toEqual({ noNumber: 'La contraseña debe tener al menos un numero' });
  });

  it('no debería retornar error si la contraseña contiene un número', () => {
    const control = new FormControl('abc123');
    expect(passwordHasNumberValidator(control)).toBeNull();
  });

  it('debería retornar error si la contraseña es más corta que la longitud mínima', () => {
    const validator = passwordMinLengthValidator(8);
    const control = new FormControl('abc12');
    expect(validator(control)).toEqual({ minLength: { requiredLength: 8, actualLength: 5, message: 'La contrasena debe tener al menos 8 caracteres' } });
  });

  it('no debería retornar error si la contraseña cumple la longitud mínima', () => {
    const validator = passwordMinLengthValidator(8);
    const control = new FormControl('abc12345');
    expect(validator(control)).toBeNull();
  });
});
