import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogged = false;
  isAdmin = false;

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuarioLogeado = localStorage.getItem('usuarioLogeado');
      if (usuarioLogeado) {
        const usuario = JSON.parse(usuarioLogeado);
        this.isLogged = true;
        this.isAdmin = usuario.role == 'admin' ? true : false;
      }
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('usuarioLogeado');
      this.isLogged = false;
      this.isAdmin = false;
    }
  }
}
