import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../core/services/user-data.service';
import { Product } from '../../../core/interfaces/product';
import { ProductGridComponent } from '../../../shared/sharedComponant/product-grid/product-grid.component';

@Component({
  selector: 'app-category-items',
  imports: [ProductGridComponent],
  templateUrl: './category-items.component.html',
  styleUrl: './category-items.component.css'
})
export class CategoryItemsComponent {
  allProducts!: Product[];
  getItembyCategory!: Product[];
  constructor(private categoryService: UserDataService, private route: ActivatedRoute) {}



  ngOnInit() {
    this.getCategoryItems();
  }



  getCategoryItems() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category){
        this.categoryService.getProduct().subscribe((data) => {
          this.allProducts = data.products;
          this.getItembyCategory = data.products.filter((product: Product) => product.category === category);
          console.log(this.getItembyCategory);
        });
      }
    })
  }
}
