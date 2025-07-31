import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { OfflineService } from '../../core/services/offline.service';
import { OfflineUiComponent } from "../../shared/components/ui/offline-ui/offline-ui.component";

@Component({
  selector: 'app-categories',
  imports: [RouterLink, OfflineUiComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
private readonly categoriesService=inject(CategoriesService)
private readonly offlineService=inject(OfflineService)
isoffline: Signal<boolean>=computed(()=>this.offlineService.isOffLine())

  myCategories:Icategory[]=[]


  ngOnInit(): void {
   this.categoriesService.getCategories().subscribe({
    next:(res)=>{
      this.myCategories=res.data
      
    }
   })
 }

 reload(){
    window.location.reload()
  }
}
