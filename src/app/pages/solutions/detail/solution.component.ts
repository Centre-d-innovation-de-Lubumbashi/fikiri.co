import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from 'environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SolutionService } from './solution.service';
import { ObservableQueryResult } from '@ngneat/query';
import { IImage } from '@core/types/models.type';
import { ISolutionResponse } from './types/response.type';
import { ImgPipe } from '@core/pipes/img.pipe';

@Component({
  selector: 'app-solution',
  standalone: true,
  templateUrl: './solution.component.html',
  imports: [NgOptimizedImage, CommonModule, RouterLink, MatProgressSpinnerModule, ImgPipe]
})
export class SolutionComponent implements OnInit {
  solution$: ObservableQueryResult<ISolutionResponse, Error>;
  #solutionSerive = inject(SolutionService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  ngOnInit(): void {
    const id = Number(this.#route.snapshot.paramMap.get('id'));
    this.load(id);
  }

  displayImage(image: IImage): string {
    return `${environment.apiUrl}uploads/solutions/${image.image_link}`;
  }

  load(id: number): void {
    this.#router.navigate(['/solutions', id]);
    this.solution$ = this.#solutionSerive.getOne(id);
  }
}
