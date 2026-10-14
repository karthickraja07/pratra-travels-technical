import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() message = 'Something went wrong.';
  @Input() showRetry = false;
  @Output() retry = new EventEmitter<void>();
}
