import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../types/models.type';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    signOut: emptyProps(),
    signIn: props<{ user: IUser | null }>()
  }
});
