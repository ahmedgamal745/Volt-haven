import { Product2 } from './../../../core/interfaces/product';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartState } from '../../../core/cart/cartState';
import { addToCartAction, decrementAction, incrementAction } from '../../../core/cart/actions/counter.actions';


@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {
  
  productQuantities: { [productId: number]: number } = {};
  cartItems: { [productId: number]: Product & { quantity: number } } = {};
  constructor(private router:Router, private store:Store<CartState>){
   this.store.select(state => state.counter.quantities).subscribe(q => {
    this.productQuantities = q;
  });

  this.store.select(state => state.counter.cartItems).subscribe(items => {
    this.cartItems = items;
  });
  }
@Input() title!: string 
@Input() products!: Product[]  
@Input() MarketProduct!: Product2[] ;
@Input() ourCategories! : any[]
@Input() productType!: number ;
@Input() showSeeMore: boolean = true;
@Input() sliceTitle: boolean = true;
@Input() customButtonText: string = 'See More';
@Input() productLimit!: number;
@Output() seeMoreClicked = new EventEmitter<void>();

  get displayedProducts() {
    
   return this.productLimit? this.products.slice(0, this.productLimit) : this.products;

  }
  get displayedBeautyProducts() {
    
    return this.productLimit ? this.MarketProduct.slice(0, this.productLimit)
      : this.MarketProduct;
  }
  get displayedallProducts(){
    return this.productLimit ? this.ourCategories.slice(0, this.productLimit)
      : this.ourCategories;
  }
   onSeeMoreClick() {
  console.log('See more clicked'); // Check if this appears
  this.seeMoreClicked.emit();
}

onImgError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.classList.add('fallback');
 
}

goToItem(category:string,id:number){
  this.router.navigate(['/user/cart' ,category,id])
}


increment(item: any) {
  this.store.dispatch(new incrementAction({ id: item.id }));
}

decrement(item: any) {
  this.store.dispatch(new decrementAction({ id: item.id }));
}
addToCart(item: any) {
  const newQty = this.productQuantities[item.id] || 0;
  const existingQty = this.cartItems[item.id]?.quantity || 0;
  const totalQty = newQty + existingQty;

  this.store.dispatch(new addToCartAction(item));

  
  
}
}
