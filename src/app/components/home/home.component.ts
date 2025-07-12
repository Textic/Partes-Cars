import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FeaturedProductsService } from '../../services/featured-products.service';
import { FeaturedProduct } from '../../services/featured-product.interface';
import { CategoriesApiService } from '../../services/categories-api.service';
import { Category } from '../../services/category.interface';
import { CarouselSlidesApiService } from '../../services/carousel-slides-api.service';
import { CarouselSlide } from '../../services/carousel-slide.interface';
import { RouterLink } from '@angular/router';

/**
 * Componente principal de la página de inicio.
 * Muestra el carrusel, productos destacados y categorías.
 */
@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showNavbar = true;
  carouselSlides: CarouselSlide[] = [];
  featuredProducts: FeaturedProduct[] = [];
  categories: Category[] = [];

  constructor(
    private featuredProductsService: FeaturedProductsService,
    private categoriesApi: CategoriesApiService,
    private carouselSlidesApi: CarouselSlidesApiService
  ) {}

  ngOnInit(): void {
    this.featuredProductsService.featuredProducts$.subscribe(data => {
      this.featuredProducts = data || [];
    });
    this.categoriesApi.getCategories().subscribe(data => {
      this.categories = data;
    });
    this.carouselSlidesApi.getCarouselSlides().subscribe(data => {
      this.carouselSlides = data;
    });
  }

  getProductLink(id: number): string {
    return `product_detail.html?id=${id}`;
  }

  getCategoryLink(title: string): string {
    return 'products.html?category=' + this.slugify(title);
  }

  getSlideLink(slide: CarouselSlide): string {
    // Si tienes un campo específico para la categoría, usa ese campo en vez de linkText
    return slide && slide.title ? 'products.html?category=' + this.slugify(slide.title) : '#';
  }

  private slugify(text: string): string {
    return text ? text.toLowerCase().replace(/ /g, '') : '';
  }
}
