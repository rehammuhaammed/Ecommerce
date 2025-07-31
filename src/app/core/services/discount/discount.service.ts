import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }
  private discountMap = new Map<string, { percentage: number, oldPrice: number }>();

  setDiscount(productId: string, discount: number, oldPrice: number): void {
    this.discountMap.set(productId, { percentage: discount, oldPrice });
  }

  getDiscount(productId: string): { percentage: number, oldPrice: number } | undefined {
    return this.discountMap.get(productId);
  }

  hasDiscount(productId: string): boolean {
    return this.discountMap.has(productId);
  }
}
