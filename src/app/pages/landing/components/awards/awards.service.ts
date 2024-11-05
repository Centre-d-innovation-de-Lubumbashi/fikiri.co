import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ISolution } from '@core/types/models.type';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getAwards(): ObservableQueryResult<ISolution[], Error> {
    return this.#query({
      queryKey: ['awards'] as const,
      queryFn: () => this.#http.get<{ data: ISolution[] }>('solutions/winning-solutions').pipe(map((res) => res.data))
    }).result$;
  }
}
