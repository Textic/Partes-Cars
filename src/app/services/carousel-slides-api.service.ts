import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarouselSlide } from './carousel-slide.interface';

@Injectable({
  providedIn: 'root'
})
export class CarouselSlidesApiService {
  private readonly apiUrl = 'https://textic.github.io/Partes-Cars-API/carouselSlides.json';

  constructor(private http: HttpClient) {}

  getCarouselSlides(): Observable<CarouselSlide[]> {
    return this.http.get<CarouselSlide[]>(this.apiUrl);
  }
}
