import { Component, input } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ISolution } from 'app/common/types/models.type';
import { ImgPipe } from 'app/common/pipes/img.pipe';

@Component({
  selector: 'app-solution-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, DatePipe, ImgPipe],
  templateUrl: './solution-card.component.html'
})
export class SolutionCardComponent {
  solution = input.required<ISolution>();
}
