import { Component } from '@angular/core';
import { Usuario } from '../../auth/usuario.interface';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { passwordHasNumberValidator, passwordMinLengthValidator } from './password-validators';

/**
 * Componente de registro de usuario.
 * Permite crear una nueva cuenta en la aplicación.
 */
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /** Nombre del usuario */
  nombre: string = '';
  /** Apellido del usuario */
  apellido: string = '';
  /** Correo electrónico del usuario */
  correo: string = '';
  /** Contraseña del usuario */
  clave: string = '';
  /** Mensaje de error */
  error: string = '';
  /** Mensaje de éxito */
  exito: string = '';

  /**
   * @param authService Servicio de autenticación
   * @param router Servicio de navegación
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Valida la contraseña ingresada por el usuario.
   * @returns Mensaje de error o null si es válida
   */
  validarClave(): string | null {
    if (this.clave.length < 8) {
      return 'La contrasena debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(this.clave)) {
      return 'La contrasena debe tener al menos una letra mayuscula';
    }
    if (!/[a-z]/.test(this.clave)) {
      return 'La contrasena debe tener al menos una letra minuscula';
    }
    if (!/\d/.test(this.clave)) {
      return 'La contrasena debe tener al menos un numero';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.clave)) {
      return 'La contrasena debe tener al menos un caracter especial';
    }
    return null;
  }

  validarCampos(): string | null {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/.test(this.nombre)) {
      return 'El nombre debe tener al menos 2 letras y solo letras';
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/.test(this.apellido)) {
      return 'El apellido debe tener al menos 2 letras y solo letras';
    }
    if (!/^\S+@\S+\.\S+$/.test(this.correo)) {
      return 'El correo no es valido';
    }
    return null;
  }

  /**
   * Registra un nuevo usuario si la clave es válida.
   * @param form Formulario de registro (opcional)
   */
  registrarUsuario(form?: NgForm) {
    this.error = '';
    this.exito = '';

    const camposError = this.validarCampos();
    if (camposError) {
      this.error = camposError;
      return;
    }

    const claveError = this.validarClave();
    if (claveError) {
      this.error = claveError;
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      clave: this.clave,
      rol: 'user'
    };

    this.authService.register(nuevoUsuario).subscribe({
      next: (registrado) => {
        if (registrado) {
          this.exito = 'Registro exitoso! Seras redirigido al login en 3 segundos.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}