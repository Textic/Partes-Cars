import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Usuario } from '../../auth/usuario.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogged = false;
  isAdmin = false;
  userName: string = 'Cuenta';
  private usuarioSuscripcion!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioSuscripcion = this.authService.usuarioActual$.subscribe(usuario => {
      this.actualizarEstado(usuario);
    })
  }

  private actualizarEstado(usuario: Usuario | null) {
    this.isLogged = !!usuario;
    this.isAdmin = usuario?.rol === 'admin';
    this.userName = usuario ? usuario.nombre : 'Cuenta';
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.usuarioSuscripcion) {
      this.usuarioSuscripcion.unsubscribe();
    }
  }
}
