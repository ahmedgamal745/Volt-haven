import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { CommonModule } from '@angular/common';
import { UserDataService } from '../../core/services/user-data.service';
import { Product } from '../../core/interfaces/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  imports: [
    CardModule,
    CommonModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories=[
     { title: 'tv', class: 'photo-1' },
     { title: 'audio', class: 'photo-2' },
     { title: 'laptop', class: 'photo-3' },
     { title: 'mobile', class: 'photo-4' },
     { title: 'gaming', class: 'photo-5' },
     { title: 'appliances', class: 'photo-6' },
  ]
  getItembyCategory!: Product[] ;
  allProducts!: Product[]

  constructor(private categoryService: UserDataService, private router: Router) {}

  navigateToCategory(category: string) {
    this.router.navigate(['/user/category', category]);
  }
}

