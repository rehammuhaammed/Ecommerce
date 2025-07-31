import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Iproducts } from './../../shared/interfaces/iproducts';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { OfflineService } from '../../core/services/offline.service';
import { DiscountService } from '../../core/services/discount/discount.service';
import { OfflineUiComponent } from "../../shared/components/ui/offline-ui/offline-ui.component";
import { SortComponent } from "../../shared/components/ui/sort/sort.component";


@Component({
  selector: 'app-specific-catergory',
  imports: [TranslatePipe, RouterLink, OfflineUiComponent, SortComponent],
  templateUrl: './specific-catergory.component.html',
  styleUrl: './specific-catergory.component.css'
})
export class SpecificCatergoryComponent implements OnInit{
   constructor() {}


  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly titleService = inject(Title);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly sweetalertService = inject(SweetalertService);
  private readonly wishlistService = inject(WishlistService);
  private readonly offlineService=inject(OfflineService)
  private readonly discountService=inject(DiscountService)
  isoffline: Signal<boolean>=computed(()=>this.offlineService.isOffLine())
  myProducts:Iproducts[] |null =null
  specificCatergoryProducts:Iproducts[]=[]
  Cname:string=''
  CId:string=''
  result:number | undefined =0
  sortOption:string='Default'



  ngOnInit(): void {
  console.log(this.myProducts);
  
    
    this.getWishList()

    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.CId=res.get('id')!
        this.Cname=res.get('name')!
        this.titleService.setTitle(this.Cname)
        console.log(this.myProducts);
        this.getdata(undefined,undefined,this.CId)
        console.log(this.myProducts);




        
      }
    })
  }

  getdata(limit?:number,page?:number,categoryId?:string,sort?:string){
                this.productsService.getAllProducts(limit,page,categoryId,sort).subscribe({
              next:(res)=>{
                this.myProducts=res.data
                 
               if(this.myProducts){
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
               }
                this.result=this.myProducts?.length
                console.log(this.myProducts);
                // this.specificCatergoryProducts = this.myProducts.filter(product => product.category.slug === this.Cname);


                }
    })
  }


    handleSort(option: string) {
        this.sortOption = option;
        this.getdata(undefined,undefined,this.CId,option)

      }
  addToCart(id:string){
    this.cartService.AddProductToCart(id).subscribe({
      next:(res)=>{
       
        this.sweetalertService.showSuccess(res.message)
        this.cartService.cartItems.set(res.numOfCartItems)
        
      }

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

}
