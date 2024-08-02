import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InfoPayloadInterface } from '../types/update-info-payload.interface';
import { User } from '../../../../../../shared/types/models-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {
  constructor(private http: HttpClient) {}

  updateProfile(payload: InfoPayloadInterface): Observable<User> {
    return this.http.patch<{ data: User }>('auth/profile', payload).pipe(map((res) => res.data));
  }
}
