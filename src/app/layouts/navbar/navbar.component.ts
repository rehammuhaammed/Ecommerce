import { AuthService } from './../../core/services/auth/auth.service';
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate/mytranslate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
// import { MenuModule, Menu } from 'primeng/menu';

// import { ButtonModule, Button } from 'primeng/button';
// import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
constructor(private flowbiteService: FlowbiteService) {}


 private readonly router=inject(Router)
 private readonly authService=inject(AuthService)
 private readonly mytranslateService=inject(MytranslateService)
 private readonly translateService=inject(TranslateService)
 private readonly cartService=inject(CartService)
 private readonly wishlistService=inject(WishlistService)
 cartItemsNumber:Signal<number> =computed(()=>this.cartService.cartItems())
 wishListItemsNumber:Signal<number> =computed(()=>this.wishlistService.whisListNum())
islogged=input<boolean>(false)
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.flowbiteService.loadFlowbite(() => initFlowbite());
    }

    
   if(this.islogged()){
    this.cartService.GetLoggedusercart().subscribe({
      next:(res)=>{
        this.cartService.cartItems.set(res.numOfCartItems)
        
      }
    })
    this.wishlistService.GetLoggedUserWishlist().subscribe({
      next:(res)=>{
        
        this.wishlistService.whisListNum.set(res.count)

      }
    
    
    })

   }

  }

    closeDropdown() {
        const dropdown = document.getElementById('dropdownUser');
        if (dropdown) {
          dropdown.classList.add('hidden');
        }
    }

  signout(){
    // 1)remove token
    localStorage.removeItem('token')

    // 2)remove userData

    this.authService.UserData=null

    // console.log(this.authService.UserData);
    


    // 3)navigate to login
    this.router.navigate(['/login'])





  }

  changelang(lang:string){
    this.mytranslateService.changeLang(lang)
  }

  tranlation(l:string):boolean{
   return this.translateService.currentLang == l
  }
}
