import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Usuario } from '../../auth/usuario.interface';
import { AuthService } from '../../auth/auth.service';

 /**
 * Componente de perfil de usuario.
 * Muestra la información del usuario autenticado.
 */
@Component({
  selector: 'app-profile',
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  /** Usuario autenticado actual */
  user: Usuario | null = null;

  /**
   * @param authService Servicio de autenticación
   */
  constructor(private authService: AuthService) {}

  /** Obtiene el usuario actual al inicializar el componente */
  ngOnInit(): void {
    this.user = this.authService.usuarioActualValue;
  }
}