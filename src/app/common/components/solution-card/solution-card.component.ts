import { Component, input } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ISolution } from '@core/types/models.type';
import { ImgPipe } from '@core/pipes/img.pipe';

@Component({
  selector: 'app-solution-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, DatePipe, ImgPipe],
  templateUrl: './solution-card.component.html'
})
export class SolutionCardComponent {
  solution = input.required<ISolution>();
}
