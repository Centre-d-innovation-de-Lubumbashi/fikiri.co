import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation, MutationResult } from '@ngneat/query';
import { IPasswordPayload } from './types/update-password.type';
import { IUser } from 'app/common/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  #http = inject(HttpClient);
  #mutation = injectMutation();

  updatePassword(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationKey: ['update-password'],
      mutationFn: (payload: IPasswordPayload) =>
        this.#http.patch<{ data: IUser }>('auth/update-password', payload).pipe(map((res) => res.data))
    });
  }
}
