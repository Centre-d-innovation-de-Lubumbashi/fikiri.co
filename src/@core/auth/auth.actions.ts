import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from 'app/common/types/models.type';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    signOut: emptyProps(),
    signIn: props<{ user: IUser | null }>()
  }
});
