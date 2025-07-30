import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { initFlowbite } from 'flowbite';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/product/products.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-specificbrand',
  imports: [TranslatePipe,RouterLink],
  templateUrl: './specificbrand.component.html',
  styleUrl: './specificbrand.component.css'
})
export class SpecificbrandComponent {


  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly titleService = inject(Title);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly sweetalertService = inject(SweetalertService);
  private readonly wishlistService = inject(WishlistService);
  myProducts:Iproducts[]=[]
  specificCatergoryProducts:Iproducts[]=[]
  Bname:string=''
  BId:string=''
  result:number=0
  sortOption:string='Default'
  isOpen:boolean = false;


  ngOnInit(): void {

    this.myProducts.length=1
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.BId=res.get('id')!
        this.Bname=res.get('name')!
        this.titleService.setTitle(this.Bname)
        
        this.getdata(undefined,undefined,undefined,undefined,this.BId)




        
      }
    })
  }

getdata(limit?:number,page?:number,categoryId?:string,sort?:string,brand?:string){
            this.productsService.getAllProducts(limit,page,categoryId,sort,brand).subscribe({
            next:(res)=>{
              
              
              this.myProducts=res.data
              this.result=this.myProducts.length
              

    }
  })
}

selectSort(displeyed:string,option?: string) {
  this.sortOption = displeyed;
  this.isOpen = false;
  this.getdata(undefined,undefined,undefined,option,this.BId)
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
