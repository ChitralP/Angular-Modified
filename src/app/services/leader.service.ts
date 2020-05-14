import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leaders/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeaderIds(): Observable<number[] | any> {
    return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id))).pipe(catchError(error => error));
  }
}  






  //   constructor() { }

//   getLeaders(): Observable<Leader[]> {
//     return of(LEADERS).pipe(delay(2000));
//   }

//   getLeader(id: string): Observable<Leader> {
//     return of(LEADERS.filter((Leader) => (Leader.id === id))[0]).pipe(delay(2000));
//   }

//   getFeaturedLeader(): Observable<Leader> {
//     return of(LEADERS.filter((Leader) => Leader.featured)[0]).pipe(delay(2000));
//   }
// }
  
  // getLeaders() : Leader[] {
  //   return LEADERS;
  // }
  // getLeader(id: string): Leader {
  //   return LEADERS.filter((lead) => (lead.id === id))[0];
  // }

  // getFeaturedLeader(): Leader {
  //   return LEADERS.filter((lead) => lead.featured)[0];
  // }

