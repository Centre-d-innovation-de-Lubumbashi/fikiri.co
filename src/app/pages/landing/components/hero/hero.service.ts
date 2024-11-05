import { inject, Injectable } from '@angular/core';
import { TotalsInterface } from './types/totals.interface';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getCount(): ObservableQueryResult<TotalsInterface, Error> {
    return this.#query({
      queryKey: ['dashboard'] as const,
      queryFn: () => this.#http.get<{ data: TotalsInterface }>('dashboard').pipe(map((res) => res.data))
    }).result$;
  }
}
