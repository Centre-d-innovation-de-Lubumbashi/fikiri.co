import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgOptimizedImage, SlicePipe } from '@angular/common';
import { ISdg } from './types/sdg.type';
import { sdgs } from './sdgs.data';

@Component({
  selector: 'app-sdgs',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe, NgIf, SlicePipe],
  templateUrl: './sdgs.component.html'
})
export class SdgsComponent {
  sdgs: ISdg[] = sdgs;
}
