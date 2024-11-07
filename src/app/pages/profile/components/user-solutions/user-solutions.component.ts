import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage, DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserSolutionsService } from './user-solutions.service';
import { ObservableQueryResult } from '@ngneat/query';
import { ISolution } from 'app/common/types/models.type';
import { ImgPipe } from 'app/common/pipes/img.pipe';

@Component({
  selector: 'app-user-solutions',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, DatePipe, MatProgressSpinnerModule, RouterModule, ImgPipe],
  templateUrl: './user-solutions.component.html'
})
export class UserSolutionsComponent implements OnInit {
  solutions$: ObservableQueryResult<ISolution[], Error>;
  #userSolutionsService = inject(UserSolutionsService);

  ngOnInit(): void {
    this.solutions$ = this.#userSolutionsService.getSolutions();
  }
}
