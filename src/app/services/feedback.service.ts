import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable, of } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getFeedbackes(): Observable<Feedback[]> {
      return this.http.get<Feedback[]>(baseURL + 'Feedbackes')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getFeedback(id: number): Observable<Feedback> {
      return this.http.get<Feedback>(baseURL + 'Feedbackes/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getFeaturedFeedback(): Observable<Feedback> {
      return this.http.get<Feedback[]>(baseURL + 'Feedbackes?featured=true').pipe(map(Feedbackes => Feedbackes[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    putFeedback(Feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.put<Feedback>(baseURL + 'feedback/', Feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
  
    }
}
