import { map } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { ISolution } from '@core/types/models.type';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getSolutions(): ObservableQueryResult<ISolution[], Error> {
    return this.#query({
      queryKey: ['solutions'] as const,
      queryFn: () => this.#http.get<{ data: ISolution[] }>('solutions/user').pipe(map((res) => res.data))
    }).result$;
  }

  getSolution(id: number): ObservableQueryResult<ISolution, Error> {
    return this.#query({
      queryKey: ['solutions', id] as const,
      queryFn: () => this.#http.get<{ data: ISolution }>(`solutions/${id}`).pipe(map((res) => res.data))
    }).result$;
  }
}
