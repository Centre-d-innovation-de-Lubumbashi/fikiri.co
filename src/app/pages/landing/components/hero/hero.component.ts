import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';
import { HeroService } from './hero.service';
import { ObservableQueryResult } from '@ngneat/query';
import { TotalsInterface } from './types/totals.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  imports: [RouterLink, NgOptimizedImage, NgIf, CommonModule, MatProgressSpinnerModule]
})
export class HeroComponent implements OnInit {
  #heroService = inject(HeroService);
  totals$: ObservableQueryResult<TotalsInterface, Error>;

  ngOnInit(): void {
    this.totals$ = this.#heroService.getCount();
  }
}
