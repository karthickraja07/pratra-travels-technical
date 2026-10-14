import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  today = new Date().toISOString().split('T')[0];

  form = this.fb.nonNullable.group(
    {
      from: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3}$/)]],
      to: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3}$/)]],
      departureDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      passengers: [1, [Validators.required, Validators.min(1), Validators.max(9)]],
    }
  );

   onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.router.navigate(['/results'], {
      queryParams: {
        ...v,
        from: v.from.trim().toUpperCase(),
        to: v.to.trim().toUpperCase(),
      },
    });
  }

}
