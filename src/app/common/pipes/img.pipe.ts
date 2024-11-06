import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  standalone: true,
  name: 'apiIMG'
})
export class ImgPipe implements PipeTransform {
  transform(value: unknown, key: string): string {
    const apiUrl = environment.apiUrl;
    const defaultImage = '/images/default-placeholder.png';

    const paths: Record<string, string> = {
      user: value?.['profile']
        ? `uploads/profiles/${value['profile']}`
        : value['google_image'] || '/images/avatar-default.webp',
      solution: value?.['images']?.at(-1)?.image_link
        ? `uploads/solutions/${value['images'].at(-1).image_link}`
        : defaultImage,
      event: value?.['images']?.[0]?.image_link ? `uploads/events/${value['images'][0].image_link}` : defaultImage
    };

    return apiUrl + (paths[key] ?? defaultImage);
  }
}
