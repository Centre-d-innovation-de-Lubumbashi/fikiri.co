import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { map } from 'rxjs';
import { IEvent } from '@core/types/models.type';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getEvents(): ObservableQueryResult<IEvent[], Error> {
    return this.#query({
      queryKey: ['events'] as const,
      queryFn: () => this.#http.get<{ data: IEvent[] }>('events').pipe(map((res) => res.data))
    }).result$;
  }
}
