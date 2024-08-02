import { ComponentStore } from '@ngrx/component-store';
import { UserInfoStoreInterface } from '../types/user-info-store.interface';
import { Observable, exhaustMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfoService } from './user-info.service';
import { Injectable } from '@angular/core';
import { authActions } from '../../../../../../shared/store/auth/data-access/auth.actions';
import { selectUser } from '../../../../../../shared/store/auth/data-access/auth.reducers';
import { MessageInterface } from '../../../../../../shared/store/auth/types/message.interface';
import { User, Solution } from '../../../../../../shared/types/models-interfaces';

@Injectable()
export class UserInfoStore extends ComponentStore<UserInfoStoreInterface> {
  userInfoState$: Observable<UserInfoStoreInterface>;
  vm$: Observable<{ userInfoState: UserInfoStoreInterface; user: User | null }>;

  constructor(private userInfoService: UserInfoService, private store: Store) {
    super({ isLoading: false, message: { type: null, message: null }, solutions: [] });
    this.userInfoState$ = this.select((state) => state);
    this.vm$ = this.select({
      userInfoState: this.userInfoState$,
      user: this.store.select(selectUser)
    });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setUpdateMessage = this.updater((state, message: MessageInterface) => ({ ...state, message }));
  setSolutions = this.updater((state, solutions: Solution[]) => ({ ...state, solutions }));
  resetMessage() {
    this.setUpdateMessage({ type: null, message: null });
  }

  updateImage = this.effect((payload: Observable<{ file: FormData; userId: number }>) =>
    payload.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) =>
        this.userInfoService.updateImage(payload.userId, payload.file).pipe(
          tapResponse({
            next: (user) => {
              this.setUpdateMessage({ type: 'success', message: 'Image mise à jour' });
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (err: HttpErrorResponse) => {
              this.setUpdateMessage({ type: 'error', message: err.error.message });
            },
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );

  getSolutions = this.effect<void>((trigger$: Observable<void>) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.userInfoService.getSolutions().pipe(
          tapResponse({
            next: (solutions) => this.setSolutions(solutions),
            error: () => this.setIsLoading(false),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
