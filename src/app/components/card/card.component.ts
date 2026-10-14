import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DurationPipe } from '../../pipes/duration.pipe';
import { Flights } from '../../model/flights';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, DurationPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
   @Input({ required: true }) flight!: Flights;
  @Output() selected = new EventEmitter<Flights>();

  get stopsLabel(): string {
    return this.flight.stops === 0
      ? 'Non-stop'
      : `${this.flight.stops} stop${this.flight.stops > 1 ? 's' : ''}`;
  }
}
