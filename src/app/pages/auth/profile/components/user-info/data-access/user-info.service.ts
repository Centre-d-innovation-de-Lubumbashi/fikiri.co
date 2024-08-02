import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Solution, User } from '../../../../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private http: HttpClient) {}

  updateImage(userId: number | undefined, file: FormData): Observable<User> {
    return this.http.post<{ data: User }>(`users/image/${userId}`, file).pipe(map((res) => res.data));
  }

  getSolutions(): Observable<Solution[]> {
    return this.http.get<{ data: Solution[] }>('solutions/user').pipe(map((res) => res.data));
  }

  getSolution(id: number): Observable<Solution> {
    return this.http.get<{ data: Solution }>(`solutions/${id}`).pipe(map((res) => res.data));
  }
}
