import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from './usuario.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  private usuarios: Usuario[] = [
    {
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'juan.perez@example.com',
      clave: '12345678',
      rol: 'user'
    },
    {
      nombre: 'Maria',
      apellido: 'Lopez',
      correo: 'maria.lopez@example.com',
      clave: '87654321',
      rol: 'user'
    },
    {
      nombre: 'Admin',
      apellido: 'User',
      correo: 'admin.user@example.com',
      clave: 'admin123',
      rol: 'admin'
    }
  ];

  constructor(private router: Router) {
    this.verificarEstadoInicial();
  }

  public get usuarioActualValue(): Usuario | null {
    return this.usuarioActualSubject.value;
  }

  private verificarEstadoInicial(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const usuarioLogeadoStr = sessionStorage.getItem('usuarioLogeado');
      if (usuarioLogeadoStr) {
        const usuarioLogeado: Usuario = JSON.parse(usuarioLogeadoStr);
        this.usuarioActualSubject.next(usuarioLogeado);
      }
    }
  }

  login(correo: string, clave: string): Observable<boolean> {
    const usuarioEncontrado = this.usuarios.find(
      (usuario) => usuario.correo === correo && usuario.clave === clave
    );

    if (usuarioEncontrado) {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem('usuarioLogeado', JSON.stringify(usuarioEncontrado));
      }
      this.usuarioActualSubject.next(usuarioEncontrado);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('usuarioLogeado');
    }
    this.usuarioActualSubject.next(null);
    this.router.navigate(['/home']);
  }
}
