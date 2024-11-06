import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  standalone: true,
  name: 'apiIMG'
})
export class ImgPipe implements PipeTransform {
  transform(value: object, key: string): string {
    const apiUrl = environment.apiUrl;
    const defaultImage = '/images/default-placeholder.png';

    switch (key) {
      case 'user':
        return value['profile'] ? `${apiUrl}uploads/profiles/${value['profile']}` : '/images/avatar-default.webp';
      case 'solution':
        return value['images'] ? `${apiUrl}uploads/solutions/${value['images'].at(-1)['image_link']}` : defaultImage;
      case 'event':
        return value['images'] ? `${apiUrl}uploads/events/${value['images'][0]['image_link']}` : defaultImage;
      default:
        return defaultImage;
    }
  }
}
