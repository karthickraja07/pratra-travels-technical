import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlightFilters, Flights } from '../../model/flights';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnChanges{
    @Input({ required: true }) flights: Flights[] = [];
  @Output() filtersChange = new EventEmitter<FlightFilters>();
   private fb = inject(FormBuilder);

  airlines: string[] = [];
  minPrice = 0;
  maxPrice = 0;

  form = this.fb.nonNullable.group({
    maxPrice: [0],
    stops: ['any'],
    airlines: [[] as string[]],
  });

    constructor() {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe(v =>
        this.filtersChange.emit({
          maxPrice: v.maxPrice ?? Infinity,
          stops: v.stops === 'any' ? null : Number(v.stops),
          airlines: v.airlines ?? [],
        })
      );
  }

   ngOnChanges(): void {
    if (this.flights.length === 0) return;

    this.airlines = [...new Set(this.flights.map(f => f.airline))].sort();
    const prices = this.flights.map(f => f.price);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.form.patchValue({ maxPrice: this.maxPrice });
  }

  toggleAirline(name: string, checked: boolean): void {
    const current = this.form.controls.airlines.value;
    this.form.controls.airlines.setValue(
      checked ? [...current, name] : current.filter(a => a !== name)
    );
  }

  isAirlineChecked(name: string): boolean {
    return this.form.controls.airlines.value.includes(name);
  }

  reset(): void {
    this.form.setValue({ maxPrice: this.maxPrice, stops: 'any', airlines: [] });
  }

}
