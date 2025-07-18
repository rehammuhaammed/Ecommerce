import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { ModalComponent } from "../../shared/components/ui/modal/modal/modal.component";

@Component({
  selector: 'app-details',
  imports: [ModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

private readonly activatedRoute =inject(ActivatedRoute)
private readonly productsService =inject(ProductsService)
public productId:any
currentimg:string=''
productDetails:Iproducts={} as Iproducts
 Math =Math; 

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.productId=res.get('id')

      this.productsService.getSpecificProduct(this.productId).subscribe({
        next:(res)=>{
          this.productDetails=res.data
          console.log(this.productDetails);
          
          
        }
      })
     
      
    }
  })
}

quantity:number=0
plus(){
  this.quantity++
  
}
min(){
  if(this.quantity>0)
  this.quantity--
}
openModal(img:string){
  this.currentimg=img
  console.log(this.currentimg);
  
}

}
