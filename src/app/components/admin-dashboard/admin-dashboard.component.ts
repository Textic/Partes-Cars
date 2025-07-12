
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeaturedProductsApiService } from '../../services/featured-products-api.service';
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

  constructor(private productosApi: FeaturedProductsApiService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosApi.getFeaturedProducts().subscribe(productos => {
      this.productos = productos;
    });
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
    this.productos.push({ ...this.nuevoProducto });
    this.nuevoProducto = this.getProductoVacio();
  }

  editarProducto(producto: FeaturedProduct) {
    this.productoEditando = { ...producto };
    this.modoEdicion = true;
  }

  guardarEdicion() {
    if (!this.productoEditando) return;
    const idx = this.productos.findIndex(p => p.id === this.productoEditando!.id);
    if (idx > -1) {
      this.productos[idx] = { ...this.productoEditando };
    }
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.productoEditando = null;
    this.modoEdicion = false;
  }

  eliminarProducto(producto: FeaturedProduct) {
    this.productos = this.productos.filter(p => p !== producto);
  }
}
