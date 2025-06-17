import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showNavbar = true;

  carouselSlides = [
    {
      img: 'https://placehold.co/1920x500/55595c/ffffff?text=Oferta+Especial+en+Frenos',
      alt: 'Oferta Especial en Frenos',
      title: '¡Oferta Especial en Sistemas de Frenos!',
      desc: 'Hasta 30% de descuento en pastillas y discos seleccionados.',
      link: 'products.html?category=frenos',
      linkText: 'Ver Ofertas',
      active: true
    },
    {
      img: 'https://placehold.co/1920x500/6c757d/ffffff?text=Nuevos+Filtros+de+Aire',
      alt: 'Nuevos Filtros de Aire',
      title: 'Nuevos Filtros de Aire de Alto Rendimiento',
      desc: 'Mejora la eficiencia de tu motor con nuestra nueva línea.',
      link: 'products.html?category=filtros',
      linkText: 'Descubrir',
      active: false
    },
    {
      img: 'https://placehold.co/1920x500/778899/ffffff?text=Accesorios+Exclusivos',
      alt: 'Accesorios Exclusivos',
      title: 'Accesorios Exclusivos para tu Vehículo',
      desc: 'Personaliza tu auto con estilo y calidad.',
      link: 'products.html?category=accesorios',
      linkText: 'Ver Accesorios',
      active: false
    }
  ];

  featuredProducts = [
    {
      img: 'https://placehold.co/300x200/E8E8E8/000000?text=Pastillas+de+Freno',
      alt: 'Pastillas de Freno',
      title: 'Pastillas de Freno Cerámicas',
      desc: 'Marca XYZ - Alta durabilidad',
      price: '$35.990',
      link: 'product_detail.html?id=1'
    },
    {
      img: 'https://placehold.co/300x200/D3D3D3/000000?text=Filtro+de+Aceite',
      alt: 'Filtro de Aceite',
      title: 'Filtro de Aceite Premium',
      desc: 'Compatible con múltiples modelos',
      price: '$12.500',
      link: 'product_detail.html?id=2'
    },
    {
      img: 'https://placehold.co/300x200/C0C0C0/000000?text=Batería+de+Auto',
      alt: 'Batería de Auto',
      title: 'Batería de Auto 60Ah',
      desc: 'Larga duración y arranque seguro',
      price: '$78.000',
      link: 'product_detail.html?id=3'
    },
    {
      img: 'https://placehold.co/300x200/A9A9A9/000000?text=Amortiguador',
      alt: 'Amortiguador',
      title: 'Amortiguador Delantero',
      desc: 'Marca ACME - Confort y seguridad',
      price: '$45.990',
      link: 'product_detail.html?id=4'
    }
  ];

  categories = [
    {
      icon: 'fas fa-car-brake',
      title: 'Frenos',
      link: 'products.html?category=frenos'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Suspensión',
      link: 'products.html?category=suspension'
    },
    {
      icon: 'fas fa-oil-can',
      title: 'Motor',
      link: 'products.html?category=motor'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Electricidad',
      link: 'products.html?category=electricidad'
    }
  ];
}
