import { Component, inject, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImgPipe } from '@core/pipes/img.pipe';
import { InfoService } from './info.service';
import { MutationResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.component.html',
  imports: [NgOptimizedImage, CommonModule, RouterModule, ImgPipe, MatIconModule]
})
export class InfoComponent {
  user = input.required<IUser>();
  #infoService = inject(InfoService);
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
