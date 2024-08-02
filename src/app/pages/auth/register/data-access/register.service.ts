import { Injectable } from '@angular/core';
import { RegisterPayloadInterface } from '../types/register-payload.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(payload: RegisterPayloadInterface): Observable<User> {
    return this.http.post<{ data: User }>('auth/register', payload).pipe(map((res) => res.data));
  }
}
