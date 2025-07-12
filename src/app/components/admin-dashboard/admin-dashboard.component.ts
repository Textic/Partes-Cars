
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeaturedProductsService } from '../../services/featured-products.service';
import { FeaturedProduct } from '../../services/featured-product.interface';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  productos: FeaturedProduct[] = [];
  productoEditando: FeaturedProduct | null = null;
  nuevoProducto: FeaturedProduct = this.getProductoVacio();
  modoEdicion: boolean = false;

  constructor(private featuredProductsService: FeaturedProductsService) {}

  ngOnInit(): void {
    this.featuredProductsService.featuredProducts$.subscribe((productos) => {
      if (productos) {
        this.productos = productos;
        this.featuredProductsService['featuredProducts'] = productos;
      } else {
        this.productos = [];
        this.featuredProductsService['featuredProducts'] = [];
      }
    });
    if (typeof window !== 'undefined' && window.sessionStorage && !window.sessionStorage.getItem('featuredProducts')) {
      this.featuredProductsService['cargarFeaturedProducts']();
      setTimeout(() => {
        const apiProducts = this.featuredProductsService['featuredProducts'];
        if (apiProducts && apiProducts.length > 0) {
          this.featuredProductsService.setFeaturedProducts(apiProducts);
        }
      }, 500);
    }
  }

  getProductoVacio(): FeaturedProduct {
    return {
      id: this.getSiguienteId(),
      img: '',
      alt: '',
      title: '',
      desc: '',
      price: ''
    };
  }

  getSiguienteId(): number {
    return this.productos.length > 0 ? Math.max(...this.productos.map(p => p.id)) + 1 : 1;
  }

  get productoForm(): FeaturedProduct {
    return this.modoEdicion && this.productoEditando ? this.productoEditando : this.nuevoProducto;
  }

  agregarProducto() {
    if (!this.nuevoProducto.title || !this.nuevoProducto.price) return;
    this.nuevoProducto.id = this.getSiguienteId();
    this.featuredProductsService.addFeaturedProduct({ ...this.nuevoProducto }).subscribe({
      next: () => {
        // Actualizar el estado y persistir
        const nuevos = [...this.productos, { ...this.nuevoProducto }];
        this.featuredProductsService.setFeaturedProducts(nuevos);
        this.nuevoProducto = this.getProductoVacio();
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  editarProducto(producto: FeaturedProduct) {
    this.productoEditando = { ...producto };
    this.modoEdicion = true;
  }

  guardarEdicion() {
    if (!this.productoEditando) return;
    const idx = this.productos.findIndex(p => p.id === this.productoEditando!.id);
    if (idx > -1) {
      const productosActualizados = [...this.productos];
      productosActualizados[idx] = { ...this.productoEditando };
      this.featuredProductsService.setFeaturedProducts(productosActualizados);
    }
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.productoEditando = null;
    this.modoEdicion = false;
  }

  eliminarProducto(producto: FeaturedProduct) {
    this.featuredProductsService.removeFeaturedProduct(producto.id).subscribe({
      next: () => {
        const nuevos = this.productos.filter(p => p.id !== producto.id);
        this.featuredProductsService.setFeaturedProducts(nuevos);
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
