import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  
  getPromotions(): Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: string): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => promo.featured)[0]);
  }
  
  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }

  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  // }

  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  // }
}
