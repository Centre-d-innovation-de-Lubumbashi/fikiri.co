import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Animations } from '@core/animations';
import { AlertComponent } from '@core/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  animations: Animations,
  imports: [
    RouterLink,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthSignInComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  signInForm: FormGroup;
  signIn = this.#authService.signIn();

  constructor() {
    this.signInForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignIn(): void {
    if (this.signInForm.invalid) return;
    this.signInForm.disable();
    this.signIn.mutate(this.signInForm.value);
    this.signInForm.enable();
  }
}
