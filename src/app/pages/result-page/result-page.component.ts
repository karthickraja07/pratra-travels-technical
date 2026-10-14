import { Component, inject } from '@angular/core';
import { FlightFilters, Flights, SearchParams } from '../../model/flights';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { FlightsService } from '../../services/flights.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, startWith, switchMap, tap } from 'rxjs';

interface ResultsState {
  status: 'loading' | 'success' | 'error';
  flights: Flights[];
  error: string;
}


const DEFAULT_FILTERS: FlightFilters = { maxPrice: Infinity, stops: null, airlines: [] };


@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [ AsyncPipe,  DatePipe, RouterLink, CardComponent, FiltersComponent, LoaderComponent, ErrorMessageComponent],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.scss'
})
export class ResultPageComponent {


    private route = inject(ActivatedRoute);
  private router = inject(Router);
  private flightService = inject(FlightsService);

    params = toSignal(this.route.queryParams, { initialValue: {} as Params });

    filters$ = new BehaviorSubject<FlightFilters>(DEFAULT_FILTERS);
  private retry$ = new BehaviorSubject<void>(undefined);

   private state$: Observable<ResultsState> = combineLatest([
    this.route.queryParams,
    this.retry$,
  ]).pipe(
    tap(() => this.filters$.next(DEFAULT_FILTERS)),
    switchMap(([params]) =>
      this.flightService.search(params as unknown as SearchParams).pipe(
        map((flights): ResultsState => ({ status: 'success', flights, error: '' })),
        startWith<ResultsState>({ status: 'loading', flights: [], error: '' }),
        // catchError lives in the INNER pipe so the outer stream survives errors
        catchError(err =>
          of<ResultsState>({ status: 'error', flights: [], error: err.message })
        )
      )
    )
  );

   vm$ = combineLatest([this.state$, this.filters$]).pipe(
    map(([state, filters]) => ({
      ...state,
      filtered: this.applyFilters(state.flights, filters),
    }))
  );

  private applyFilters(flights: Flights[], f: FlightFilters): Flights[] {
    return flights.filter(
      fl =>
        fl.price <= f.maxPrice &&
        (f.stops === null || fl.stops === f.stops) &&
        (f.airlines.length === 0 || f.airlines.includes(fl.airline))
    );
  }

  retry(): void {
    this.retry$.next();
  }

  openDetails(flight: Flights): void {
    this.router.navigate(['/flights', flight.id], {
      queryParams: { passengers: this.params()['passengers'] ?? 1 },
    });
  }
   
}
