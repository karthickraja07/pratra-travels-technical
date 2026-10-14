import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flights, SearchParams } from '../model/flights';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private http = inject(HttpClient);
  private API_Url = "./mockData/flights.json";

 search(params: SearchParams): Observable<Flights[]> {
    return this.http.get<Flights[]>(this.API_Url).pipe(
      delay(800), // simulate network latency
      map(flights => flights.filter(f =>
        f.from === params.from.toUpperCase() &&
        f.to === params.to.toUpperCase()
      )),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<Flights> {
    return this.http.get<Flights[]>(this.API_Url).pipe(
      delay(400),
      map(flights => {
        const flight = flights.find(f => f.id === id);
        if (!flight) throw new Error('Flight not found');
        return flight;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse | Error) {
    const message = err instanceof HttpErrorResponse
      ? 'Unable to reach the flight service. Please try again.'
      : err.message;
    return throwError(() => new Error(message));
  }
  
}
