import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { environment } from 'environments/environment';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [NgOptimizedImage, MatButtonModule],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
  title = input.required<string>();

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
