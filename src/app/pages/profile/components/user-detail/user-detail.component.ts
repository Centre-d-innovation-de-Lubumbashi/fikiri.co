import { Component, inject, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { UserDetailsService } from './user-detail.service';
import { MutationResult } from '@ngneat/query';
import { IUser } from 'app/common/types/models.type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  imports: [NgOptimizedImage, CommonModule, RouterModule, ImgPipe, MatIconModule]
})
export class UserDetailsComponent {
  user = input.required<IUser>();
  #infoService = inject(UserDetailsService);
  uploadImage: MutationResult<IUser, Error, unknown>;

  constructor() {
    this.uploadImage = this.#infoService.updateImage();
  }

  onImageChange(event: Event, userId: number): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      this.uploadImage.mutate({ userId, file: formData });
    }
  }
}
