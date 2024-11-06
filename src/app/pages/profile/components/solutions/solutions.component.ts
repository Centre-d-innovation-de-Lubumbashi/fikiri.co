import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage, DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SolutionsService } from './solutions.service';
import { ObservableQueryResult } from '@ngneat/query';
import { ISolution } from '@core/types/models.type';
import { ImgPipe } from '@core/pipes/img.pipe';

@Component({
  selector: 'app-user-solutions',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, DatePipe, MatProgressSpinnerModule, RouterModule, ImgPipe],
  templateUrl: './solutions.component.html'
})
export class UserSolutionsComponent implements OnInit {
  solutions$: ObservableQueryResult<ISolution[], Error>;
  #solutionsService = inject(SolutionsService);

  ngOnInit(): void {
    this.solutions$ = this.#solutionsService.getSolutions();
  }

  padWord(word: string): string {
    return word.slice(0, 10).padEnd(3, '...');
  }
}
