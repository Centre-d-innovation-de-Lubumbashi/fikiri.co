import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ISolutionsReponse } from './types/response.type';
import { IQueryParams } from './types/query-params.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEvent, IThematic } from '@core/types/models.type';
import { ISearchResponse } from './types/search-response.type';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getSolutions(queryParams: IQueryParams): ObservableQueryResult<ISolutionsReponse, Error> {
    const params = this.#buildQueryParams(queryParams);
    return this.#query({
      queryKey: ['solutions'] as const,
      queryFn: () =>
        this.#http.get<{ data: ISolutionsReponse }>('solutions/mapped', { params }).pipe(map((res) => res.data))
    }).result$;
  }

  getThematics(eventId: number): ObservableQueryResult<IThematic[], Error> {
    return this.#query({
      queryKey: ['event', eventId] as const,
      queryFn: () =>
        this.#http.get<{ data: IThematic[] }>(`thematics/event/${eventId}`).pipe(map((response) => response.data))
    }).result$;
  }

  getEvents(): ObservableQueryResult<IEvent[], Error> {
    return this.#query({
      queryKey: ['events'] as const,
      queryFn: () => this.#http.get<{ data: IEvent[] }>('events').pipe(map((response) => response.data))
    }).result$;
  }

  searchSolutions(query: string): ObservableQueryResult<ISearchResponse, Error> {
    return this.#query({
      queryKey: ['search', query] as const,
      queryFn: () =>
        this.#http
          .get<{ data: ISearchResponse }>('solutions/search', { params: { q: query } })
          .pipe(map((res) => res.data))
    }).result$;
  }

  #buildQueryParams(queryParams: IQueryParams): HttpParams {
    let params = new HttpParams();
    const { page, event, thematic } = queryParams;
    if (page) params = params.set('page', page.toString());
    if (event) params = params.set('event', event);
    if (thematic) params = params.set('thematic', queryParams.thematic);
    return params;
  }
}
