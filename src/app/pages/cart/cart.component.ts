import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { IcartProduct } from '../../shared/interfaces/icart-product';
import { RouterLink } from '@angular/router';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  imports: [FormsModule,RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
private readonly cartService=inject(CartService)
private readonly sweetalertService=inject(SweetalertService)
private readonly platformId=inject(PLATFORM_ID)


data:IcartProduct ={} as IcartProduct
totaPrice:number=0
count:number=0
ngOnInit(): void {

  //to prevent the totalCartPrice= undefiend and the empty card design apper for 1second 
   this.data.totalCartPrice=1
 

  this.cartService.GetLoggedusercart().subscribe({
    next:(res)=>{
      // console.log(res);
      if(isPlatformBrowser(this.platformId)){
        localStorage.setItem("cartId",res.cartId)

      }
      this.data=res.data

    },
    error:(err)=>{
      console.log(err);
      
      
    }
  })

}




removeItem(id:string){
  this.cartService.RemoveSpecificCartItem(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.sweetalertService.showSuccess('item deleted successfully')
      this.data=res.data
      this.cartService.cartItems.set(res.numOfCartItems)

     


      
    }
  })

}

UpdateCount(id:string,q:number){
  this.cartService.UpdateCartProductQuantity(id,q).subscribe({
  next:(res)=>{
    
     this.data=res.data

    
    
  }
 })
}

clear(){
  this.cartService.ClearUserCart().subscribe({
    next:(res)=>{
      
      this.sweetalertService.showSuccess('Cart deleted successfully')

      
      setTimeout(()=>{
        this.data={} as IcartProduct
        this.cartService.cartItems.set(0)
        
      },1500)

      
    }

  })
}


}
