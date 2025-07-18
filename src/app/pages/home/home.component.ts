import { Component, inject, OnInit} from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-home',
  imports:[CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
  
})
export class HomeComponent implements OnInit {

  private readonly router=inject(Router)
  myProducts: Iproducts[] = [];
  metadata: any = {};
  currentPage: number = 1;
  pages: number[] = [];
  myCategories:Icategory[]=[]
  searchItem:string=''

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items:5
      }
    },
    nav: true
  }

  FadeOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        autoplay: true,
        animateIn: 'fadeIn', 
        animateOut: 'fadeOut', 
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        items: 1
      };
  
  private readonly productsService = inject(ProductsService); 
  private readonly categoriesService = inject(CategoriesService); 

  ngOnInit(): void {
    this.callAPI(this.currentPage);
      this.callApiCategory()
  }

  callAPI(page:number): void {
    this.productsService.getProducts(page,30).subscribe({

      next: (res) => {
        this.myProducts = res.data;
        this.metadata = res.metadata;
        this.currentPage = this.metadata.currentPage;
        

          this.pages=[]
          for (let i = 1; i <= this.metadata.numberOfPages; i++) {
            this.pages.push(i);
          }
       
        
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }


callApiCategory(){
this.categoriesService.getCategories().subscribe({
  next:(res)=>{
    this.myCategories=res.data
    
    
  }
})
  
}






}


