import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  standalone: true,
  name: 'apiIMG'
})
export class ImgPipe implements PipeTransform {
  transform(value: unknown, key: string): string {
    const apiUrl = environment.apiUrl;
    const defaultImage = {
      user: '/images/avatar-default.webp',
      default: '/images/no-image.jpg'
    };

    if (key === 'user') {
      return value['profile']
        ? `${apiUrl}uploads/profiles/${value['profile']}`
        : (value['google_image'] ?? defaultImage.user);
    }

    if (key === 'solution') {
      return value['images']
        ? `${apiUrl}uploads/solutions/${value['images']?.at(-1)?.image_link}`
        : defaultImage.default;
    }

    if (key === 'event') {
      return value['images'] ? `${apiUrl}uploads/events/${value['images'][0].image_link}` : defaultImage.default;
    }
  }
}
