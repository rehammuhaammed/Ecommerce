import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';



export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},

    

    {path:'',component: AuthComponent , canActivate:[loggedGuard],title:'auth',children:[
          {path:'login', loadComponent:()=> import ('./pages/login/login.component').then( (c)=>c.LoginComponent ) ,title:'login'},
          {path:'register', loadComponent:()=> import ('./pages/register/register.component').then( (c)=>c.RegisterComponent ) ,title:'register'},
          {path:'forget', loadComponent:()=> import ('./pages/forget-pass/forget-pass.component').then( (c)=>c.ForgetPassComponent ) ,title:'Forget Password'},
          {path:'verify-code', loadComponent:()=> import ('./pages/reset-code/reset-code.component').then( (c)=>c.ResetCodeComponent ) ,title:'Verfiy Code'},
          {path:'reset-pass', loadComponent:()=> import ('./pages/newpass/newpass.component').then( (c)=>c.NewpassComponent ) ,title:'Reset Password'},
        
        
    ]},

    {path:'',component: BlankComponent, canActivate:[authGuard],title:'blank',children:[
        {path:'home',loadComponent:()=> import ('./pages/home/home.component').then( (c)=>c.HomeComponent ),title:'home'},
        {path:'cart',loadComponent:()=> import ('./pages/cart/cart.component').then( (c)=>c.CartComponent ) ,title:'cart'},
        {path:'products',loadComponent:()=> import ('./pages/products/products.component').then( (c)=>c.ProductsComponent ) ,title:'products'},
        {path:'categories',loadComponent:()=> import ('./pages/categories/categories.component').then( (c)=>c.CategoriesComponent ) ,title:'categories'},
        {path:'brands',loadComponent:()=> import ('./pages/brands/brands.component').then( (c)=>c.BrandsComponent ) ,title:'brands'},
        {path:'details/:id',loadComponent:()=> import ('./pages/details/details.component').then( (c)=>c.DetailsComponent ) ,title:'details'},
        {path:'checkout',loadComponent:()=> import ('./pages/checkout/checkout.component').then( (c)=>c.CheckoutComponent ) ,title:'checkout'},
        {path:'allorders',loadComponent:()=> import ('./pages/allorderes/allorderes.component').then( (c)=>c.AllorderesComponent ) ,title:'Allorders'},
        {path:'wishlist',loadComponent:()=> import ('./pages/wishlist/wishlist.component').then( (c)=>c.WishlistComponent ) ,title:'WishList'},
        {path:'category-details/:id/:name',loadComponent:()=> import ('./pages/specific-catergory/specific-catergory.component').then( (c)=>c.SpecificCatergoryComponent ) },
        {path:'brand-details/:id/:name',loadComponent:()=> import ('./pages/specificbrand/specificbrand.component').then( (c)=>c.SpecificbrandComponent ) },
        {path:'**', component:NotFoundComponent,title:'Error404!'}
    ]},


    

];
