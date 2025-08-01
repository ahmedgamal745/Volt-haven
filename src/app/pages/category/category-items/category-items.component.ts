import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../core/services/user-data.service';
import { Product } from '../../../core/interfaces/product';
import { ProductGridComponent } from '../../../shared/sharedComponant/product-grid/product-grid.component';
import { SharedModuleModule } from '../../../shared/sharedModule/shared-module/shared-module.module';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-items',
  imports: [ProductGridComponent,SharedModuleModule],
  templateUrl: './category-items.component.html',
  styleUrl: './category-items.component.css'
})
export class CategoryItemsComponent {
  allProducts!: Product[];
  getItembyCategory!: Product[];
  constructor(private categoryService: UserDataService, private route: ActivatedRoute,private loadingSpinner: NgxSpinnerService) {}



  ngOnInit() {
    this.getCategoryItems();
  }



  getCategoryItems() {
    this.loadingSpinner.show()
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category){
        this.categoryService.getProduct().subscribe((data) => {
          this.allProducts = data.products;
          this.getItembyCategory = data.products.filter((product: Product) => product.category === category);
          console.log(this.getItembyCategory);
          this.loadingSpinner.hide()
        });
      }
    })
  }
}
