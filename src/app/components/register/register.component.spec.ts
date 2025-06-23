import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { passwordHasNumberValidator, passwordMinLengthValidator } from './password-validators';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });
});

describe('Validación de contraseña en RegisterComponent', () => {
  it('debería mostrar error si la contraseña no contiene un número', () => {
    const control = new FormControl('abcdefg');
    expect(passwordHasNumberValidator(control)).toEqual({ noNumber: 'La contraseña debe tener al menos un numero' });
  });

  it('no debería mostrar error si la contraseña contiene un número', () => {
    const control = new FormControl('abc123');
    expect(passwordHasNumberValidator(control)).toBeNull();
  });

  it('debería mostrar error si la contraseña tiene menos de 8 caracteres', () => {
    const validator = passwordMinLengthValidator(8);
    const control = new FormControl('abc12');
    expect(validator(control)).toEqual({ minLength: { requiredLength: 8, actualLength: 5, message: 'La contrasena debe tener al menos 8 caracteres' } });
  });

  it('no debería mostrar error si la contraseña tiene al menos 8 caracteres', () => {
    const validator = passwordMinLengthValidator(8);
    const control = new FormControl('abc12345');
    expect(validator(control)).toBeNull();
  });
});
