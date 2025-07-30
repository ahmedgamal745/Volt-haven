import { Component } from '@angular/core';
import { ProductGridComponent } from '../../../shared/sharedComponant/product-grid/product-grid.component';
import { UserDataService } from '../../../core/services/user-data.service';
import { Product } from '../../../core/interfaces/product';


@Component({
  selector: 'app-all-product',

  imports: [ProductGridComponent],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent {
 allProducts!: Product[] ;


  constructor(private productService: UserDataService) {}
 


ngOnInit() {
    this.previewProducts();
}





  previewProducts(){
    this.productService.getProduct().subscribe((data) => {
      this.allProducts = data.products 
      console.log(this.allProducts);
    });
  }
}
