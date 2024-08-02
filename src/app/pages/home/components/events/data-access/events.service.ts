import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Event } from '../../../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root'
})
export class eventsService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<{ data: Event[] }>('events').pipe(map((res) => res.data));
  }
}
