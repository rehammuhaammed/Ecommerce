import { Iproducts } from './../../shared/interfaces/iproducts';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { OfflineService } from '../../core/services/offline.service';
import { OfflineUiComponent } from "../../shared/components/ui/offline-ui/offline-ui.component";

@Component({
  selector: 'app-wishlist',
  imports: [OfflineUiComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

    private readonly wishlistService=inject(WishlistService)
    private readonly cartService =inject(CartService)
    private readonly sweetalertService=inject(SweetalertService)
    private readonly offlineService=inject(OfflineService)
    isoffline: Signal<boolean>=computed(()=>this.offlineService.isOffLine())
    myProducts:Iproducts[] | null=null

    ngOnInit(): void {
    
     this.getdata()
     
     
    }
    
    addToCart(id:string){
      this.cartService.AddProductToCart(id).subscribe({
        next:(res)=>{
          // console.log(res);
          this.sweetalertService.showSuccess(res.message)
          this.cartService.cartItems.set(res.numOfCartItems)
          
        }

      })
    }

    reload(){
    window.location.reload()
    }
    getdata(){
       this.wishlistService.GetLoggedUserWishlist().subscribe({
        next:(res)=>{
          this.myProducts=res.data
          // console.log(res);
          

          
        }
      })
    }
    remove(id:string){
      this.wishlistService.RemoveProductFromWishlist(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.wishlistService.whisListNum.set(res.data.length)
          this.wishlistService.whisList.set(res.data)
          this.sweetalertService.showSuccess('Removed from wishlist');
          this.getdata()
          
        }
      })
    }




}
