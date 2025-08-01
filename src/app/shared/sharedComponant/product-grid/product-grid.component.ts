import { Product2 } from './../../../core/interfaces/product';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {
@Input() title!: string 
@Input() products!: Product[]  
@Input() BeautyProduct!: Product2[] ;
@Input() productType!: number ;
@Input() showSeeMore: boolean = true;
@Input() sliceTitle: boolean = true;
@Input() customButtonText: string = 'See More';
@Input() productLimit!: number;
@Output() seeMoreClicked = new EventEmitter<void>();

  get displayedProducts() {
    this.productType = 1;
   return this.productLimit? this.products.slice(0, this.productLimit) : this.products;

  }
  get displayedBeautyProducts() {
    
    return this.productLimit ? this.BeautyProduct.slice(0, this.productLimit)
      : this.BeautyProduct;
  }
   onSeeMoreClick() {
  console.log('See more clicked'); // Check if this appears
  this.seeMoreClicked.emit();
}
}
