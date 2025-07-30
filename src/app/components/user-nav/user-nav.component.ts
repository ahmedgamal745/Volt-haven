import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { SharedModuleModule } from '../../shared/sharedModule/shared-module/shared-module.module';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { UserDataService } from '../../core/services/user-data.service';
import { AuthService } from '../../core/services/auth.service';
import { ErorrMessageService } from '../../core/services/erorr-message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [
    SharedModuleModule,
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
    MenuModule,
    SharedModuleModule
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {

  constructor(private userData:UserDataService, private authService: AuthService, private router: Router,private error:ErorrMessageService,private loadingSpinner: NgxSpinnerService,) { 
    this.userName = localStorage.getItem('username') || '';
    this.cartCount = 0; // Initialize cart count

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
  
  logout() {
    this.loadingSpinner.show(); // Show loading spinner during logout
    this.authService.logout().subscribe({
      next: (res)=>{

        this.loadingSpinner.hide(); // Hide loading spinner after logout
        this.error.showSuccess('Logout successful'); // Show success message

        console.log('Logout successful:', res);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.userData.userName.next(''); // Clear user name in the service
        this.cartCount = 0; // Reset cart count
        
        // Optionally, you can navigate to the login page or home page
        this.router.navigate(['/login']);
        
      }
      ,
      error: (err) => {
        this.loadingSpinner.hide(); // Hide loading spinner on error
        this.error.showError('Logout failed'); // Show error message
        console.error('Logout failed:', err);
      }

    });
  }

}