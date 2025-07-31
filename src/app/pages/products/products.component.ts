import { withEventReplay } from '@angular/platform-browser';
import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
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
import { OfflineService } from '../../core/services/offline.service';
import { DiscountService } from '../../core/services/discount/discount.service';
import { OfflineUiComponent } from "../../shared/components/ui/offline-ui/offline-ui.component";
import { SortComponent } from "../../shared/components/ui/sort/sort.component";

@Component({
  selector: 'app-products',
  imports: [TranslatePipe, RouterLink, SearchPipe, FormsModule, OfflineUiComponent, SortComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService); 
  private readonly cartService = inject(CartService); 
  private readonly sweetalertService=inject(SweetalertService)
  private readonly wishlistService=inject(WishlistService)
  private readonly offlineService=inject(OfflineService)
  private readonly discountService =inject(DiscountService)
  isoffline: Signal<boolean>=computed(()=>this.offlineService.isOffLine())
  myProducts: Iproducts[] = [];
  metadata: any = {};
  currentPage:number=1
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
         this.myProducts = res.data;
        this.myProducts = this.myProducts.map(p => {
                
                if (!this.discountService.hasDiscount(p._id)) {
                  const apply = Math.random() > 0.5;
                  if (apply) {
                    const discount = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
                    const oldPrice = Math.round(p.price * 100 / (100 - discount));
                    this.discountService.setDiscount(p._id, discount, oldPrice);
                  }
                }

                const savedDiscount = this.discountService.getDiscount(p._id);
                if (savedDiscount) {
                  p.discountPercentage = savedDiscount.percentage;
                  p.originalPrice = savedDiscount.oldPrice;
                }

                return p;
              });
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

  toggleWishlist(id: string): void {
    if (this.Inwishlist(id)) {
      this.wishlistService.RemoveProductFromWishlist(id).subscribe({
        next: (res) => {
          
        this.wishlistService.whisListNum.set(res.data.length)
          this.wishlistService.whisList.set(res.data)
          this.sweetalertService.showSuccess('Removed from wishlist');
        }
      });

    
    } else {
      this.wishlistService.AddproductToWishlist(id).subscribe({
        next: (res) => {
          this.wishlistService.whisList.set(res.data)
          this.wishlistService.whisListNum.set(res.data.length)
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

   reload(){
    window.location.reload()
  }
   handleSort(option: string) {
     this.sortOption = option;
     this.callAPI(this.limit,this.currentPage,undefined,option);
    }


}
