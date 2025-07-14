import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';


export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},


    {path:'',component: BlankComponent ,title:'blank',children:[
        {path:'home',loadComponent:()=> import ('./pages/home/home.component').then( (c)=>c.HomeComponent ),title:'home'},
        {path:'cart',loadComponent:()=> import ('./pages/cart/cart.component').then( (c)=>c.CartComponent ) ,title:'cart'},
        {path:'products',loadComponent:()=> import ('./pages/products/products.component').then( (c)=>c.ProductsComponent ) ,title:'products'},
        {path:'categories',loadComponent:()=> import ('./pages/categories/categories.component').then( (c)=>c.CategoriesComponent ) ,title:'categories'},
        {path:'brands',loadComponent:()=> import ('./pages/brands/brands.component').then( (c)=>c.BrandsComponent ) ,title:'brands'},
    ]},


    {path:'',component: AuthComponent ,title:'auth',children:[
          {path:'login', loadComponent:()=> import ('./pages/login/login.component').then( (c)=>c.LoginComponent ) ,title:'login'},
          {path:'register', loadComponent:()=> import ('./pages/register/register.component').then( (c)=>c.RegisterComponent ) ,title:'register'},
        
    ]},

    {path:'**', loadComponent:()=> import ('./pages/not-found/not-found.component').then( (c)=>c.NotFoundComponent ) ,title:'Error404!'}

];
