import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Animations } from '@core/animations';
import { AlertComponent } from '@core/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { MutationResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  animations: Animations,
  standalone: true,
  imports: [
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule,
    NgOptimizedImage,
    AuthCardComponent
  ]
})
export class AuthResetPasswordComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  resetPasswordForm: FormGroup;
  resetPassword: MutationResult<IUser, Error, unknown>;

  constructor() {
    this.resetPasswordForm = this.#formBuilder.group({
      token: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
    this.resetPassword = this.#authService.resetPassword();
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.invalid) return;
    this.resetPasswordForm.disable();
    this.resetPassword.mutate(this.resetPasswordForm.value);
    this.resetPasswordForm.enable();
  }
}
