import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Solution } from '../../../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root'
})
export class WinningSolutionsService {
  constructor(private http: HttpClient) {}

  getWinningSolutions(): Observable<Solution[]> {
    return this.http.get<{ data: Solution[] }>('solutions/winning-solutions').pipe(map((res) => res.data));
  }
}
