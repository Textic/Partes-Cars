import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { FeaturedProduct } from '../services/featured-product.interface';
import { FeaturedProductsApiService } from '../services/featured-products-api.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturedProductsService {
  private featuredProductsSubject = new BehaviorSubject<FeaturedProduct[] | null>(null);
  public featuredProducts$ = this.featuredProductsSubject.asObservable();

  private readonly STORAGE_KEY = 'appFeaturedProducts';
  private featuredProducts: FeaturedProduct[] = [];

  constructor(private featuredProductsApiService: FeaturedProductsApiService) {
    this.cargarFeaturedProducts();
    this.verificarEstadoInicial();
  }

  private cargarFeaturedProducts(): void {
    this.featuredProductsApiService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
      },
      error: () => {
        this.featuredProducts = [];
      }
    });
  }

  public get featuredProductsValue(): FeaturedProduct[] | null {
    return this.featuredProductsSubject.value;
  }

  private verificarEstadoInicial(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const productsStr = sessionStorage.getItem('featuredProducts');
      if (productsStr) {
        const products: FeaturedProduct[] = JSON.parse(productsStr);
        this.featuredProductsSubject.next(products);
      }
    }
  }

  setFeaturedProducts(products: FeaturedProduct[]): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('featuredProducts', JSON.stringify(products));
    }
    this.featuredProductsSubject.next(products);
  }

  addFeaturedProduct(product: FeaturedProduct): Observable<boolean> {
    const exists = this.featuredProducts.some(p => p.id === product.id);
    if (exists) {
      return throwError(() => new Error('El producto ya está destacado.'));
    }
    this.featuredProducts.push(product);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.featuredProducts));
    }
    return of(true);
  }

  removeFeaturedProduct(productId: number): Observable<boolean> {
    const index = this.featuredProducts.findIndex(p => p.id === productId);
    if (index === -1) {
      return throwError(() => new Error('El producto no está en destacados.'));
    }
    this.featuredProducts.splice(index, 1);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.featuredProducts));
    }
    return of(true);
  }
}
