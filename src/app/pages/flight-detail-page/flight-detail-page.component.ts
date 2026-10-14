import { Component, inject } from '@angular/core';
import { Flights } from '../../model/flights';
import { AsyncPipe, CurrencyPipe, DatePipe, Location } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

interface DetailsState {
  status: 'loading' | 'success' | 'error';
  flight: Flights | null;
  error: string;
}




@Component({
  selector: 'app-flight-detail-page',
  standalone: true,
  imports: [ AsyncPipe, DatePipe, CurrencyPipe, DurationPipe, LoaderComponent, ErrorMessageComponent],
  templateUrl: './flight-detail-page.component.html',
  styleUrl: './flight-detail-page.component.scss'
})
export class FlightDetailPageComponent {
  private route = inject(ActivatedRoute);
  private flightService = inject(FlightsService);
    private location = inject(Location);
    passengers = Number(this.route.snapshot.queryParamMap.get('passengers')) || 1;

    vm$ = this.route.paramMap.pipe(
    map(p => p.get('id') ?? ''),
    switchMap(id =>
      this.flightService.getById(id).pipe(
        map((flight): DetailsState => ({ status: 'success', flight, error: '' })),
        startWith<DetailsState>({ status: 'loading', flight: null, error: '' }),
        catchError(err =>
          of<DetailsState>({ status: 'error', flight: null, error: err.message })
        )
      )
    )
  );

  back(): void {
    this.location.back(); // keeps the search + filters context
  }

}
