import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  
  constructor(private router: Router) {}

  login() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuariosStr = localStorage.getItem('usuario');
      if (usuariosStr) {
        const usuarios = JSON.parse(usuariosStr);
        const usuario = usuarios.find((u: any) => u.email === this.email && u.password === this.password);
        if (usuario) {
          localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));
          this.error = '';
          this.router.navigate(['/home']);
        } else {
          this.error = 'Email o contraseña incorrectos';
        }
      } else {
        this.error = 'No hay usuarios registrados';
      }
    }
  }
}
