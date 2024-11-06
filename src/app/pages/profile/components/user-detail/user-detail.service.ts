import { map } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation, MutationResult } from '@ngneat/query';
import { IUser } from 'app/common/types/models.type';
import { IImgPayload } from './type/img-payload.type';
import { Store } from '@ngrx/store';
import { authActions } from '@core/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  #http = inject(HttpClient);
  #mutation = injectMutation();
  #store = inject(Store);

  updateImage(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationKey: ['upload'] as const,
      mutationFn: (payload: IImgPayload) =>
        this.#http.post<{ data: IUser }>(`users/image/${payload.userId}`, payload.file).pipe(map((res) => res.data)),
      onSuccess: (user) => this.#store.dispatch(authActions.signIn({ user }))
    });
  }
}
