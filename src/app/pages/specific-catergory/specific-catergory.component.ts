import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Iproducts } from './../../shared/interfaces/iproducts';
import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { ProductsService } from '../../core/services/product/products.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-specific-catergory',
  imports: [TranslatePipe,RouterLink],
  templateUrl: './specific-catergory.component.html',
  styleUrl: './specific-catergory.component.css'
})
export class SpecificCatergoryComponent implements OnInit{
   constructor(private flowbiteService: FlowbiteService) {}


  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly titleService = inject(Title);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly sweetalertService = inject(SweetalertService);
  private readonly wishlistService = inject(WishlistService);
  myProducts:Iproducts[]=[]
  specificCatergoryProducts:Iproducts[]=[]
  Cname:string=''
  CId:string=''
  result:number=0
  sortOption:string='Default'
  isOpen:boolean = false;


  ngOnInit(): void {

    this.myProducts.length=1
    this.getWishList()

    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.CId=res.get('id')!
        this.Cname=res.get('name')!
        this.titleService.setTitle(this.Cname)
        
        this.getdata(undefined,undefined,this.CId)




        
      }
    })
  }

getdata(limit?:number,page?:number,categoryId?:string,sort?:string){
              this.productsService.getAllProducts(limit,page,categoryId,sort).subscribe({
            next:(res)=>{
              this.myProducts=res.data
              this.result=this.myProducts.length
              console.log(this.myProducts);
              // this.specificCatergoryProducts = this.myProducts.filter(product => product.category.slug === this.Cname);


    }
  })
}

selectSort(displeyed:string,option?: string) {
  this.sortOption = displeyed;
  this.isOpen = false;
  this.getdata(undefined,undefined,this.CId,option)
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
