import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolutionCardComponent } from 'app/common/components/solution-card/solution-card.component';
import { SolutionCardSkeletonComponent } from 'app/common/components/solution-card-skeleton/solution-card-skeleton.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { IQueryParams } from './types/query-params.type';
import { ObservableQueryResult } from '@ngneat/query';
import { ISolutionsReponse } from './types/response.type';
import { SolutionsService } from './solutions.service';
import { IEvent, IThematic } from '@core/types/models.type';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-solutions',
  standalone: true,
  templateUrl: './solutions.component.html',
  imports: [
    RouterLink,
    CommonModule,
    SolutionCardComponent,
    SolutionCardSkeletonComponent,
    NgComponentOutlet,
    NgxPaginationModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule
  ]
})
export class SolutionsComponent implements OnInit {
  skeletonArray = Array(20).fill(0);
  openSearchResult = true;
  solutions$: ObservableQueryResult<ISolutionsReponse, Error>;
  events$: ObservableQueryResult<IEvent[], Error>;
  thematics$: ObservableQueryResult<IThematic[], Error>;
  #solutionsService = inject(SolutionsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams: IQueryParams = {
    page: +this.#route.snapshot.queryParams?.page || null,
    event: +this.#route.snapshot.queryParams?.event || 1,
    thematic: +this.#route.snapshot.queryParams?.thematic || null
  };

  ngOnInit(): void {
    this.#loadSolutions();
    this.events$ = this.#solutionsService.getEvents();
    this.thematics$ = this.#solutionsService.getThematics(this.queryParams.event);
  }

  onFilterChange(event: MatSelectChange, filter: string): void {
    this.queryParams.page = null;
    this.queryParams[filter] = event.value === 'all' ? null : event.value;
    this.#updateRouteAndSolutions();
  }

  onPageChange(currentPage: number): void {
    this.queryParams.page = currentPage === 1 ? null : currentPage;
    this.#updateRouteAndSolutions();
  }

  #loadSolutions(): void {
    this.solutions$ = this.#solutionsService.getSolutions(this.queryParams);
  }

  #updateRoute(): void {
    const { page, thematic } = this.queryParams;
    const queryParams = { page, thematic };
    this.#router.navigate(['/solutions'], { queryParams });
  }

  #updateRouteAndSolutions(): void {
    this.#updateRoute();
    this.#loadSolutions();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isSearchInput = target.closest('.search-input');
    if (!isSearchInput) {
      this.openSearchResult = false;
    }
  }
}
