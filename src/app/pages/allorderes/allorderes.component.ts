import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { AllordersService } from '../../core/services/allorder/allorders.service';
import { IshippingDetails } from '../../shared/interfaces/ishipping-details';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-allorderes',
  imports: [DatePipe,TranslatePipe],
  templateUrl: './allorderes.component.html',
  styleUrl: './allorderes.component.css'
})
export class AllorderesComponent implements OnInit{
  private readonly authService=inject(AuthService)
  private readonly allordersService=inject(AllordersService)



  shippingdata:IshippingDetails[]=[]


  ngOnInit(): void {
    //  console.log(this.authService.decodeToken().id);
  this.allordersService.getUserOrders(this.authService.decodeToken().id).subscribe({
    next:(res)=>{
      this.shippingdata=res
      // console.log(this.shippingdata);

      
      
    }
  })
  
   
  }



}
