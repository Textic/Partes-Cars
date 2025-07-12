import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FeaturedProductsApiService } from '../../services/featured-products-api.service';
import { FeaturedProduct } from '../../services/featured-product.interface';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: FeaturedProduct | undefined;
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private productsApi: FeaturedProductsApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (!id) {
      this.notFound = true;
      this.loading = false;
      return;
    }
    this.productsApi.getFeaturedProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
      this.notFound = !this.product;
      this.loading = false;
    });
  }
}
