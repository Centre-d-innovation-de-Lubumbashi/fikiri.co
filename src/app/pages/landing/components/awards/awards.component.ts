import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardsService } from './awards.service';
import { RouterLink } from '@angular/router';
import { SolutionCardComponent } from 'app/common/components/solution-card/solution-card.component';
import { SolutionCardSkeletonComponent } from 'app/common/components/solution-card-skeleton/solution-card-skeleton.component';
import { ObservableQueryResult } from '@ngneat/query';
import { ISolution } from 'app/common/types/models.type';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [SolutionCardComponent, CommonModule, SolutionCardSkeletonComponent, RouterLink],
  templateUrl: './awards.component.html'
})
export class AwardsComponent implements OnInit {
  #awardsService = inject(AwardsService);
  awards$: ObservableQueryResult<ISolution[], Error>;

  ngOnInit(): void {
    this.awards$ = this.#awardsService.getAwards();
  }
}
