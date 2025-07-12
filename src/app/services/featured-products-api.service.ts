import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeaturedProduct } from './featured-product.interface';

@Injectable({
  providedIn: 'root'
})
export class FeaturedProductsApiService {
  private readonly apiUrl = 'https://textic.github.io/Partes-Cars-API/featuredProducts.json';

  constructor(private http: HttpClient) {}

  getFeaturedProducts(): Observable<FeaturedProduct[]> {
    return this.http.get<FeaturedProduct[]>(this.apiUrl);
  }
}
