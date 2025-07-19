import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink, RouterModule } from '@angular/router';

import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [
    MenubarModule, 
    BadgeModule, 
    AvatarModule, 
    InputTextModule, 
    RippleModule, 
    CommonModule,
    RouterLink,
    RouterModule,
    OverlayBadgeModule ,
    ButtonModule,
    MenuModule
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {

  constructor(private userData:UserDataService){

  }
  userName:string=''
  cartCount:number = 0
  items: MenuItem[] | undefined;
  menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: '/user/profile'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/user/settings'
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];
  logout() {
    
    console.log('Logout clicked');
    
  }
  
   
  ngOnInit() {
    this.getCartCount() 
    this.getUserData() 
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/user/home'
      },
      {
        label: 'Category',
        icon: 'pi pi-sitemap',
        routerLink: '/user/category'
      },
      {
        label: 'Products',
        icon: 'pi pi-objects-column',
        routerLink: '/user/products'
      },
      

    ];
  }
  getCartCount():void{

    const id = localStorage.getItem('token')?? ''
    this.userData.CartCount(id).subscribe((res)=>{
      
      
      this.cartCount = res.cart.length
      
    })
  }
  getUserData() {
    this.userData.userName.subscribe({
      next: (name) => {
        this.userName = name || 'Guest'; 
      },
      error: (err) => {
        console.error('Error fetching user name:', err);
        this.userName = 'Guest';
      }
    });
  }
}