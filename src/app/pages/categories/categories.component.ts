import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
private readonly categoriesService=inject(CategoriesService)

  myCategories:Icategory[]=[]


  ngOnInit(): void {
   this.categoriesService.getCategories().subscribe({
    next:(res)=>{
      this.myCategories=res.data
      
    }
   })
 }


}
