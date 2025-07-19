import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { registerGuard } from './guards/register.guard';



export const routes: Routes = [
    
    {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),
        children:[
            {path:'',redirectTo:'login', pathMatch:'full'},
           {path:'login',loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent)},
           {path:'register',loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),
            canDeactivate:[registerGuard]
           },
        ]
    },
    {path:'user', loadComponent:()=>import('./layouts/user-layout/user-layout.component').then((c)=>c.UserLayoutComponent),
        canActivate:[authGuard],
        children:[
            {path:'',redirectTo:'home', pathMatch:'full'},
            {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent)},
            {path:'details',loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent)},
            {path:'products',loadComponent:()=>import('./pages/product/product.component').then((c)=>c.ProductComponent)},
            {path:'cart',loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent)},
            {path:'category',loadComponent:()=>import('./pages/category/category.component').then((c)=>c.CategoryComponent)}
        ]

    },
    
];
