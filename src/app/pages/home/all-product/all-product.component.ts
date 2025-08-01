import { Component } from '@angular/core';
import { ProductGridComponent } from '../../../shared/sharedComponant/product-grid/product-grid.component';
import { UserDataService } from '../../../core/services/user-data.service';
import { Product, Product2 } from '../../../core/interfaces/product';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedModuleModule } from '../../../shared/sharedModule/shared-module/shared-module.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-product',

  imports: [ProductGridComponent,SharedModuleModule],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent {
 allProducts!: Product[] ;
 beautyProducts!: Product2[] ;
 productType: boolean = true;

  constructor(private productService: UserDataService,private loadingSpinner: NgxSpinnerService,private route: ActivatedRoute) {}
 


ngOnInit() {
    this.previewProducts();
}





  previewProducts(){
    this.loadingSpinner.show()
     this.route.paramMap.subscribe(params => {
       const type = params.get('type');
       if (type === 'Tech') {
         this.productService.getProduct().subscribe((data) => {
           this.allProducts = data.products;
           this.loadingSpinner.hide();
         });
       }else if (type === 'Beauty') {
         this.productService.getProduct2().subscribe((data) => {
          this.productType = false;
           this.beautyProducts = data.products;
           this.loadingSpinner.hide();
         });
       }
     });
}

}