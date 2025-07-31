import { Ibrand } from './../../shared/interfaces/ibrand';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { OfflineService } from '../../core/services/offline.service';
import { OfflineUiComponent } from "../../shared/components/ui/offline-ui/offline-ui.component";

@Component({
  selector: 'app-brands',
  imports: [RouterLink, OfflineUiComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly offlineService=inject(OfflineService)
  isoffline: Signal<boolean>=computed(()=>this.offlineService.isOffLine())
  mybrands:Ibrand[]=[]


  ngOnInit(): void {
    this.productsService.GetAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.mybrands=res.data
        
      }
    })
  }
   reload(){
    window.location.reload()
  }

}
