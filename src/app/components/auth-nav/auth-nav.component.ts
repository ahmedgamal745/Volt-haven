import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink } from '@angular/router';

@Component({

    selector: 'app-auth-nav',
  imports: [
    MenubarModule,CommonModule,RouterLink
  ],
  
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.css'
})
export class AuthNavComponent {
 items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'login',
                icon: 'pi pi-sign-in',
                routerLink: '/login'
            },
            {
                label: 'register',
                icon: 'pi pi-user-plus',
                routerLink: '/register'
            },
            
           
        ];
    }
}
