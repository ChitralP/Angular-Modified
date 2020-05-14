import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'Promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'Promotions/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'Promotions?featured=true').pipe(map(promotions => promotions[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotionIds(): Observable<number[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.map(promotion => promotion.id))).pipe(catchError(error => error));
  }
}  




  //   constructor() { }

  
//   getPromotions(): Observable<Promotion[]> {
//     return of(PROMOTIONS).pipe(delay(2000));
//   }

//   getPromotion(id: string): Observable<Promotion> {
//     return of(PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0]).pipe(delay(2000));
//   }

//   getFeaturedPromotion(): Observable<Promotion> {
//     return of(PROMOTIONS.filter((Promotion) => Promotion.featured)[0]).pipe(delay(2000));
//   }
// }
  
  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }

  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  // }

  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  // }

