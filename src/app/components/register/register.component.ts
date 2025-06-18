import { Component } from '@angular/core';
import { Usuario } from '../../auth/usuario.interface';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

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

  registrarUsuario() {
    this.error = '';
    this.exito = '';

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
          this.exito = '¡Registro exitoso! Seras redirigido al login en 3 segundos.';
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