import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    
    {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),
        children:[
            {path:'',redirectTo:'login', pathMatch:'full'},
           {path:'login',loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent)},
           {path:'register',loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent)},
        ]
    },
    {path:'user', loadComponent:()=>import('./layouts/user-layout/user-layout.component').then((c)=>c.UserLayoutComponent),
        canActivate:[authGuard]

    },
    // {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent)}
];
