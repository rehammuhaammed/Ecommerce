import { withEventReplay } from '@angular/platform-browser';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/category/categories.service';
import { ProductsService } from '../../core/services/product/products.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [TranslatePipe,RouterLink,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService); 
  private readonly cartService = inject(CartService); 
    private readonly sweetalertService=inject(SweetalertService)
    private readonly wishlistService=inject(WishlistService)


  myProducts: Iproducts[] = [];
  metadata: any = {};
  currentPage: number = 1;
  pages: number[] = [];
  myCategories:Icategory[]=[]
  searchItem:string=''
  result:number=0
  sortOption:string='Default'
  isOpen:boolean = false;
  limit:number=12
  


 ngOnInit(): void {
    this.callAPI(this.limit,this.currentPage);
    this.getWishList()
  }

  callAPI(limit?:number,page?:number,categoryId?:string,sort?:string,brand?:string): void {
   
    this.productsService.getAllProducts(limit,page,categoryId,sort,brand).subscribe({
      next: (res) => {
        // console.log(res);
        
        this.myProducts = res.data;
        this.metadata = res.metadata;
        this.currentPage = this.metadata.currentPage;
        this.result=this.myProducts.length
        

          this.pages=[]
          for (let i = 1; i <= this.metadata.numberOfPages; i++) {
            this.pages.push(i);
          }
       
      },
      
    });
  }


  addToCart(id:string){
    this.cartService.AddProductToCart(id).subscribe({
      next:(res)=>{
        this.sweetalertService.showSuccess(res.message)
        this.cartService.cartItems.set(res.numOfCartItems)
      },


    })
    

  }
  selectSort(displeyed:string,option?: string) {
    this.sortOption = displeyed;
    this.isOpen = false;
    this.callAPI(12,this.currentPage,undefined,option)
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

        
        this.wishlistService.whisList.set(res.data.map((product: any) => product._id))

    }
  })
}

}
