import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserDataService } from '../../../core/services/user-data.service';
import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-some-product',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './some-product.component.html',
  styleUrl: './some-product.component.css'
})
export class SomeProductComponent {
  constructor(private productService: UserDataService) {}
  allProducts!: Product[] ;
  ngOnInit() {  
    this.previewProducts();
  }

  previewProducts() {  
      this.productService.getProduct().subscribe((data) => {
          this.allProducts = data.products.slice(0, 4); // Get the first 8 products
          console.log(this.allProducts);
          
      });
  }
}
