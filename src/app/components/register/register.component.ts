import { Component } from '@angular/core';
import { Usuario } from '../../auth/usuario.interface';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { passwordHasNumberValidator, passwordMinLengthValidator } from './password-validators';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  clave: string = '';
  error: string = '';
  exito: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  validarClave(): string | null {
    if (this.clave.length < 8) {
      return 'La contrasena debe tener al menos 8 caracteres';
    }
    if (!/\d/.test(this.clave)) {
      return 'La contrasena debe tener al menos un numero';
    }
    return null;
  }

  registrarUsuario(form?: NgForm) {
    this.error = '';
    this.exito = '';

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