import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../core/services/user-data.service';
import { Product, Product2 } from '../../../core/interfaces/product';
import { ProductGridComponent } from '../../../shared/sharedComponant/product-grid/product-grid.component';
import { SharedModuleModule } from '../../../shared/sharedModule/shared-module/shared-module.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-category-items',
  imports: [ProductGridComponent,SharedModuleModule],
  templateUrl: './category-items.component.html',
  styleUrl: './category-items.component.css'
})
export class CategoryItemsComponent {
  allProducts!: Product[];
  MarketProducts!:Product2 []
  getItembyCategory!: any[];
  constructor(private categoryService: UserDataService, private route: ActivatedRoute,private loadingSpinner: NgxSpinnerService) {}



  ngOnInit() {
    this.getCategoryItems();
  }



  getCategoryItems() {
  this.loadingSpinner.show();

  this.route.paramMap.subscribe(params => {
    const category = params.get('category');

    if (!category) {
      this.loadingSpinner.hide();
      return;
    }

    const product$ = this.categoryService.getProduct?.();
    const product2$ = this.categoryService.getProduct2?.();

    if (product$ && product2$) {
      forkJoin([product$, product2$]).subscribe({
        next: ([techData, marketData]) => {
          this.allProducts = techData.products || [];
          this.MarketProducts = marketData.products || [];

          const combinedProducts = [...this.allProducts, ...this.MarketProducts];

          this.getItembyCategory = combinedProducts.filter(
            (product: any) => product.category?.toLowerCase() === category.toLowerCase()
          );

          console.log('Filtered by category:', this.getItembyCategory);
          this.loadingSpinner.hide();
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.loadingSpinner.hide();
        }
      });
    } else {
      this.loadingSpinner.hide();
    }
  });
}

}
