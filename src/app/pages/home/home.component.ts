import { Component, inject, OnInit, ɵɵstylePropInterpolate3} from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';






@Component({
  selector: 'app-home',
  imports:[CarouselModule,RouterLink,FormsModule,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
  
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService); 
  private readonly categoriesService = inject(CategoriesService); 
  private readonly cartService = inject(CartService); 
    private readonly sweetalertService=inject(SweetalertService)
    private readonly wishlistService=inject(WishlistService)


  myProducts: Iproducts[] = [];
  metadata: any = {};
  currentPage: number = 1;
  pages: number[] = [];
  myCategories:Icategory[]=[]
  searchItem:string=''



  customOptions: OwlOptions = {
    loop: true,
    rtl:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items:5
      }
    },
    nav: true
  }

  FadeOptions: OwlOptions = {
        loop: true,
        rtl:true,
        autoplayHoverPause: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        autoplay: true,
        animateIn: 'fadeIn', 
        animateOut: 'fadeOut', 
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        items: 1
      };
  
  ngOnInit(): void {

     this.getWishList()
      this.callAPI();
      this.callApiCategory()
     
            
  }

  callAPI(): void {
   
    this.productsService.getAllProducts(12).subscribe({
      next: (res) => {
        this.myProducts = res.data;
      },
      
    });
  }


callApiCategory(){
this.categoriesService.getCategories().subscribe({
  next:(res)=>{
    this.myCategories=res.data
    
    
  }
})
  
}


addToCart(id:string){
  this.cartService.AddProductToCart(id).subscribe({
    next:(res)=>{
      this.sweetalertService.showSuccess(res.message)
      this.cartService.cartItems.set(res.numOfCartItems)
      
    },


  })
}

toggleWishlist(id: string): void {
  if (this.Inwishlist(id)) {
    this.wishlistService.RemoveProductFromWishlist(id).subscribe({
      next: (res) => {
       
        this.wishlistService.whisList.set(res.data)
        this.sweetalertService.showSuccess('Removed from wishlist');
      }
    });

  
  } else {
    this.wishlistService.AddproductToWishlist(id).subscribe({
      next: (res) => {
        this.wishlistService.whisList.set(res.data)
        this.sweetalertService.showSuccess('Added to wishlist');
      }
    });
  
  }
}

 Inwishlist(productId: string){
   return this.wishlistService.whisList().includes(productId);
   console.log(this.wishlistService.whisList().includes(productId));
   
 }

getWishList(){
  this.wishlistService.GetLoggedUserWishlist().subscribe({
    next:(res)=>{

     ;
        this.wishlistService.whisList.set(res.data.map((product: any) => product._id))

    }
  })
}
}

