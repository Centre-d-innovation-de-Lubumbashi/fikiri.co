import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MutationResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { UpdatePasswordService } from './update.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-password',
  standalone: true,
  templateUrl: './update.component.html',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class UpdatePasswordComponent {
  form: FormGroup;
  updatePassword: MutationResult<IUser, Error, unknown>;
  #fb = inject(FormBuilder);
  #updatePasswordService = inject(UpdatePasswordService);

  constructor() {
    this.form = this.#fb.nonNullable.group({
      old_password: [''],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
    this.updatePassword = this.#updatePasswordService.updatePassword();
  }

  onSumbit(): void {
    this.updatePassword.mutate(this.form.value);
  }
}
