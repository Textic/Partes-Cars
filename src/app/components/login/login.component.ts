import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

/**
 * Componente de inicio de sesión.
 * Permite a los usuarios autenticarse en la aplicación.
 */
@Component({
  selector: 'app-login',
  imports: [NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /** Correo electrónico ingresado por el usuario */
  email: string = '';
  /** Contraseña ingresada por el usuario */
  password: string = '';
  /** Mensaje de error en caso de fallo de autenticación */
  error: string = '';
  
  /**
   * @param authService Servicio de autenticación
   * @param router Servicio de navegación
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Inicia sesión con las credenciales ingresadas.
   */
  login() {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.error = 'Correo electronico o contraseña incorrectos';
      }
    });
  }
}
