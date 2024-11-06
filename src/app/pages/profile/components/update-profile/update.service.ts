import { map } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation, MutationResult } from '@ngneat/query';
import { IUpdateInfo } from './types/update-info.type';
import { IUser } from '@core/types/models.type';
import { Store } from '@ngrx/store';
import { authActions } from '@core/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {
  #http = inject(HttpClient);
  #mutation = injectMutation();
  #store = inject(Store);

  updateProfile(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationKey: ['update-profile'] as const,
      mutationFn: (payload: IUpdateInfo) =>
        this.#http.patch<{ data: IUser }>('auth/profile', payload).pipe(map((res) => res.data)),
      onSuccess: (user) => this.#store.dispatch(authActions.signIn({ user }))
    });
  }
}
