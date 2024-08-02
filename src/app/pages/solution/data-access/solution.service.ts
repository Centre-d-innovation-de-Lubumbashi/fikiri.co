import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SolutionResponseInterface } from '../types/solution-response.interface';
import { HttpClient } from '@angular/common/http';
import { Solution } from '../../../shared/types/models-interfaces';

@Injectable()
export class SolutionService {
  constructor(private http: HttpClient) {}

  getSolution(id: number): Observable<SolutionResponseInterface> {
    return this.http.get<SolutionResponseInterface>(`solutions/${id}`);
  }

  uploadImage(solutionId: number | undefined, file: FormData): Observable<Solution> {
    return this.http.post<{ data: Solution }>(`solutions/image/${solutionId}`, file).pipe(map((res) => res.data));
  }
}
