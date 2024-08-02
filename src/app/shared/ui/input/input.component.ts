import { Component, inject, input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { IErrors } from '../../store/auth/types/errors';

@Component({
  selector: 'app-input',
  standalone: true,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html'
})
export class InputComponent {
  name = input<string>('');
  label = input<string>('');
  type = input<'email' | 'password' | 'text' | 'number'>('text');
  placeholder = input<string>('');
  validationErrors = input<IErrors[]>([]);

  getError(field: string): string {
    const error = this.validationErrors().find((error: IErrors) => error.property === field);
    if (!error) return '';
    return error.message;
  }
}
