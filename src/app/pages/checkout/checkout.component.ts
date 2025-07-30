import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { OrderService } from '../../core/services/order/order.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, AlertComponent,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
private readonly formBuilder=inject(FormBuilder)
private readonly orderService=inject(OrderService)
private readonly cartService=inject(CartService)
private readonly router=inject(Router)
cartID:string=''

shippingForm !: FormGroup

ngOnInit(): void {

  this.shippingForm=this.formBuilder.group({
    details : [null,[Validators.required]],
    phone : [null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city : [null,[Validators.required]],
  })
}


credit(){
  // console.log(this.shippingForm.value);
  
  
  this.cartID=localStorage.getItem('cartId')!
  this.orderService.CheckoutSession(this.cartID,this.shippingForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status=='success'){
        window.open(res.session.url,'_self')
      }
      
    }
  })


  
}

cash(){
  // console.log(this.shippingForm.value);
  
  
  this.cartID=localStorage.getItem('cartId')!
  this.orderService.CreateCashOrder(this.cartID,this.shippingForm.value).subscribe({
    next:(res)=>{
      // console.log(res);
      if(res.status=='success'){
        this.router.navigate(['/allorders'])
      }
      this.cartService.cartItems.set(0)
      
    }
  })


  
}



}
