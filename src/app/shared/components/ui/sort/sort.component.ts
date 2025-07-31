import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { ProductsService } from '../../../../core/services/product/products.service';

@Component({
  selector: 'app-sort',
  imports: [],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css'
})
export class SortComponent {

  constructor(private flowbiteService: FlowbiteService) {}

  private readonly productsService=inject(ProductsService)
   @Input({required:true}) resultNum: number |undefined = 0;
  @Output() sortChanged = new EventEmitter();
  isOpen:boolean = false;
  sortOption:string='Default'

  ngOnInit(): void {
      if (typeof window !== 'undefined') {
        this.flowbiteService.loadFlowbite(() => initFlowbite());
      }
  }

  selectSort(displeyed:string,option?: string) {
    this.sortOption = displeyed;
    this.isOpen = false;
     this.sortChanged.emit(option); 
  }
}
