import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Usuario } from './usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApiService {
  private readonly apiUrl = 'https://textic.github.io/Partes-Cars-API/users.json';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
