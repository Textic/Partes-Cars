import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

/**
 * Componente para recuperación de contraseña.
 * Permite a los usuarios restablecer su clave de acceso.
 */
@Component({
  selector: 'app-recover-password',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  /** Correo electrónico del usuario */
  correo: string = '';
  /** Nueva clave a establecer */
  nuevaClave: string = '';
  /** Mensaje de error */
  error: string = '';
  /** Mensaje de éxito */
  exito: string = '';

  /**
   * @param authService Servicio de autenticación
   * @param router Servicio de navegación
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Envía la solicitud para recuperar la contraseña.
   */
  recuperarClave() {
    this.error = '';
    this.exito = '';

    this.authService.recoverPassword(this.correo, this.nuevaClave).subscribe({
      next: (actualizado) => {
        if (actualizado) {
          this.exito = '¡Contraseña actualizada con exito! Seras redirigido al login en 3 segundos.';
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