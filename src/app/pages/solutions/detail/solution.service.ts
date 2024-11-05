import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISolutionResponse } from './types/response.type';
import { ISolution } from '@core/types/models.type';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getOne(id: number): ObservableQueryResult<ISolutionResponse, Error> {
    return this.#query({
      queryKey: ['solution'] as const,
      queryFn: () => this.#http.get<{ data: ISolutionResponse }>(`solutions/${id}`).pipe(map((res) => res.data))
    }).result$;
  }

  uploadImage(solutionId: number, file: FormData): ObservableQueryResult<ISolution, Error> {
    return this.#query({
      queryKey: ['solution'] as const,
      queryFn: () =>
        this.#http.post<{ data: ISolution }>(`solutions/image/${solutionId}`, file).pipe(map((res) => res.data))
    }).result$;
  }

  deleteImage(solutionId: number, imageId: number): ObservableQueryResult<ISolution, Error> {
    return this.#query({
      queryKey: ['solution'] as const,
      queryFn: () =>
        this.#http.delete<{ data: ISolution }>(`solutions/${solutionId}/image/${imageId}`).pipe(map((res) => res.data))
    }).result$;
  }
}
