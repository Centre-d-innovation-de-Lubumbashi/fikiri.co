import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html'
})
export class MessageComponent {
  message = input<string | null>(null);
  type = input<'success' | 'error' | null>(null);
  handleClose = output<void>();

  close(): void {
    this.handleClose.emit();
  }
}
