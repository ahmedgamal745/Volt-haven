import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { RippleModule } from 'primeng/ripple';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { SomeProductComponent } from "./some-product/some-product.component";


@Component({
  selector: 'app-home',
  imports: [CommonModule, SomeProductComponent]
    ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    slides = [
    { title: '4K Ultra HD Smart TV', subtitle: 'Stunning visuals with smart features', class: 'slide-1' },
    { title: 'High-Performance Laptop', subtitle: 'Powerful processing for work and play.', class: 'slide-2' },
    { title: 'Latest Smartphone', subtitle: 'Sleek design, advanced camera tech.', class: 'slide-3' },
    { title: 'PlayStation 5 Pro', subtitle: 'Next-gen gaming at its finest.', class: 'slide-4' },
    
  ];

  timeRunning = 3000;
  timeAutoNext = 7000;
  timeBarAnimation = 'runningTime 7s linear forwards';
  autoSlideInterval: any;
  transitionTimeout: any;

  ngOnInit() {
    this.autoSlideInterval = setInterval(() => {
      this.showSlider('next');
    }, this.timeAutoNext);
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
    clearTimeout(this.transitionTimeout);
  }

  showSlider(type: 'next' | 'prev') {
    if (type === 'next') {
      const first = this.slides.shift();
      if (first) this.slides.push(first);
    } else {
      const last = this.slides.pop();
      if (last) this.slides.unshift(last);
    }

    clearInterval(this.autoSlideInterval);
    this.autoSlideInterval = setInterval(() => {
      this.showSlider('next');
    }, this.timeAutoNext);

    this.resetAnimation();
  }

  resetAnimation() {
    this.timeBarAnimation = 'none';
    setTimeout(() => {
      this.timeBarAnimation = 'runningTime 7s linear forwards';
    }, 10);
  }

  getPositionClass(index: number): string {
    if (index === 0) return 'main';
    if (index === 1) return 'active';
    if (index === 2) return 'pos-1';
    if (index === 3) return 'pos-2';
    if (index === 4) return 'pos-3';
    if (index === 5) return 'pos-4';
    return 'hidden';
  }
}
