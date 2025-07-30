import { Ibrand } from './../../shared/interfaces/ibrand';
import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { SweetalertService } from '../../core/services/sweetalert/sweetalert.service';
import { Iproducts } from '../../shared/interfaces/iproducts';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
 private readonly activatedRoute=inject(ActivatedRoute)
  private readonly titleService = inject(Title);
  private readonly productsService = inject(ProductsService);
  private readonly sweetalertService = inject(SweetalertService);
  mybrands:Ibrand[]=[]
  ngOnInit(): void {
    this.productsService.GetAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.mybrands=res.data
        
      }
    })
  }

}
