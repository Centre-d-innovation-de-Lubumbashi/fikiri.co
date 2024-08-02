import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISolution, User } from '../../../../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private http: HttpClient) {}

  updateImage(userId: number | undefined, file: FormData): Observable<User> {
    return this.http.post<{ data: User }>(`users/image/${userId}`, file).pipe(map((res) => res.data));
  }

  getSolutions(): Observable<ISolution[]> {
    return this.http.get<{ data: ISolution[] }>('solutions/user').pipe(map((res) => res.data));
  }

  getSolution(id: number): Observable<ISolution> {
    return this.http.get<{ data: ISolution }>(`solutions/${id}`).pipe(map((res) => res.data));
  }
}
