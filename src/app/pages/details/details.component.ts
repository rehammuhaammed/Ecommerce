import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { ModalComponent } from "../../shared/components/ui/modal/modal/modal.component";
import { CartService } from '../../core/services/cart/cart.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { TranslatePipe } from '@ngx-translate/core';
import { log } from 'node:console';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { OfflineService } from '../../core/services/offline.service';
import { OfflineUiComponent } from "../../shared/components/ui/offline-ui/offline-ui.component";

@Component({
  selector: 'app-details',
  imports: [ModalComponent, TranslatePipe, RouterLink, OfflineUiComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

private readonly activatedRoute =inject(ActivatedRoute)
private readonly productsService =inject(ProductsService)
private readonly cartService =inject(CartService)
private readonly sweetalertService=inject(SweetalertService)
private readonly offlineService=inject(OfflineService)
isoffline: Signal<boolean>=computed(()=>this.offlineService.isOffLine())
productId:any
currentimg:string=''
productDetails:Iproducts={} as Iproducts
Math =Math; 
quantity:number=0
myProducts: Iproducts[] = [];
relatedProducts:Iproducts[]=[];

constructor(private flowbiteService: FlowbiteService) {}


ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.productId=res.get('id')

      this.productsService.getSpecificProduct(this.productId).subscribe({
        next:(res)=>{
          this.productDetails=res.data
            if (typeof window !== 'undefined') {
              this.flowbiteService.loadFlowbite(() => initFlowbite());
            }
            
            this.productsService.getAllProducts().subscribe({
            next:(res)=>{
              this.myProducts=res.data
              // console.log(res);
              
              // console.log(this.myProducts[0].category.name);
              this.relatedProducts = this.myProducts.filter(product => product.category.name === this.productDetails.category.name);

              //  console.log(this.relatedProducts);
            }
          })
          
          
          
          
        }
      })
     
      
    }
  })


}

 reload(){
    window.location.reload()
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
openModal(img:string){
  this.currentimg=img
  console.log(this.currentimg);
}

}
