import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '@core/types/models.type';
import { UpdateInfoService } from './update.service';
import { MutationResult } from '@ngneat/query';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-info',
  standalone: true,
  templateUrl: './update.component.html',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class UpdateProfileComponent implements OnInit {
  user = input.required<IUser>();
  form: FormGroup;
  updateProfile: MutationResult<IUser, Error, unknown>;
  #fb = inject(FormBuilder);
  #updateInfoService = inject(UpdateInfoService);

  constructor() {
    this.form = this.#fb.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required]
    });
    this.updateProfile = this.#updateInfoService.updateProfile();
  }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.user()?.name,
      address: this.user()?.address,
      phone_number: this.user()?.phone_number
    });
  }

  onSubmit(): void {
    this.updateProfile.mutate(this.form.value);
  }
}
