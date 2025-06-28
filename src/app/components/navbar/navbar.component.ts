import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Usuario } from '../../auth/usuario.interface';
import { Subscription } from 'rxjs';

/**
 * Componente de barra de navegación principal.
 * Muestra opciones según el estado de autenticación del usuario.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  /** Indica si el usuario está autenticado */
  isLogged = false;
  /** Indica si el usuario es administrador */
  isAdmin = false;
  /** Nombre del usuario mostrado en la barra */
  userName: string = 'Cuenta';
  /** Suscripción al observable de usuario actual */
  private usuarioSuscripcion!: Subscription;

  /**
   * @param authService Servicio de autenticación
   */
  constructor(private authService: AuthService) { }

  /** Inicializa la suscripción al usuario actual */
  ngOnInit(): void {
    this.usuarioSuscripcion = this.authService.usuarioActual$.subscribe(usuario => {
      this.actualizarEstado(usuario);
    })
  }

  /**
   * Actualiza el estado de la barra según el usuario
   * @param usuario Usuario actual o null
   */
  private actualizarEstado(usuario: Usuario | null) {
    this.isLogged = !!usuario;
    this.isAdmin = usuario?.rol === 'admin';
    this.userName = usuario ? usuario.nombre : 'Cuenta';
  }

  /** Cierra la sesión del usuario */
  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  /** Cancela la suscripción al destruir el componente */
  ngOnDestroy() {
    if (this.usuarioSuscripcion) {
      this.usuarioSuscripcion.unsubscribe();
    }
  }
}
