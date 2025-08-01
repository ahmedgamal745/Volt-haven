
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductGridComponent } from "../../shared/sharedComponant/product-grid/product-grid.component";
import { UserDataService } from '../../core/services/user-data.service';
import { Product, Product2 } from '../../core/interfaces/product';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../shared/sharedModule/shared-module/shared-module.module';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  imports: [CommonModule,ProductGridComponent]
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
  constructor(private productService: UserDataService,private router: Router,private loadingSpinner: NgxSpinnerService,) {}
  itemType =[
    { title: 'Tech' },
    { title: 'Beauty' },
  ]
allProducts!: Product[] ;
BeautyProducts!: Product2[] ;
mostExpensiveTechProduct!: Product []
mostExpensiveBeautyProduct!: Product2 []
  timeRunning = 3000;
  timeAutoNext = 7000;
  timeBarAnimation = 'runningTime 7s linear forwards';
  autoSlideInterval: any;
  transitionTimeout: any;

  ngOnInit() {
    this.autoSlideInterval = setInterval(() => {
      this.showSlider('next');
    }, this.timeAutoNext);
    this. previewProducts()
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

  gotoallProducts(type: string) {
    
  console.log('Event received'); // Check if this appears
  this.router.navigate(['/user/home/all-products', type]);
}
  previewProducts() {
  // Tech products
  this.productService.getProduct()?.subscribe((data) => {
    this.allProducts = data.products;
    this.mostExpensiveTechProduct = [...this.allProducts].sort((a, b) => b.price - a.price);
    console.log(this.allProducts);
  });

  // Beauty products
  const product2$ = this.productService.getProduct2?.();
  if (product2$) {
    product2$.subscribe((data) => {
      this.BeautyProducts = data.products;
      console.log(this.BeautyProducts);
      this.mostExpensiveBeautyProduct = [...this.BeautyProducts].sort((a, b) => b.price - a.price);
    });
  }
}
  
    
  
}
