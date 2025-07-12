import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Usuario } from './usuario.interface';
import { UsuariosApiService } from '../services/usuarios-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  private readonly STORAGE_KEY = 'appUsuarios';
  private usuarios: Usuario[] = [];

  constructor(
    private router: Router,
    private usuariosApiService: UsuariosApiService
  ) {
    this.cargarUsuarios();
    this.verificarEstadoInicial();
  }

  private cargarUsuarios(): void {
    this.usuariosApiService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: () => {
        this.usuarios = [];
      }
    });
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

  register(usuario: Usuario): Observable<boolean> {
    const existeUsuario = this.usuarios.some(u => u.correo === usuario.correo);
    if (existeUsuario) {
      return throwError(() => new Error('El correo electrónico ya está registrado.'));
    }

    if (usuario.clave.length < 8) {
      return throwError(() => new Error('La contraseña debe tener al menos 8 caracteres.'));
    }
    
    this.usuarios.push(usuario);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.usuarios));
    }
    return of(true);
  }

  recoverPassword(correo: string, nuevaClave: string): Observable<boolean> {
    const usuarioIndex = this.usuarios.findIndex(u => u.correo === correo);

    if (usuarioIndex === -1) {
      return throwError(() => new Error('El correo electrónico no se encuentra registrado.'));
    }

    if (nuevaClave.length < 8) {
      return throwError(() => new Error('La nueva contraseña debe tener al menos 8 caracteres.'));
    }

    this.usuarios[usuarioIndex].clave = nuevaClave;

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.usuarios));
    }

    return of(true);
  }
}
