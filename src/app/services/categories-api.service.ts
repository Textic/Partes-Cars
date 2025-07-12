import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  private readonly apiUrl = 'https://textic.github.io/Partes-Cars-API/categories.json';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
