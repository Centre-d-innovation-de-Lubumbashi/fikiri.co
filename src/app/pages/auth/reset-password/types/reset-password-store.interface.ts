import { IErrors } from '../../../../shared/store/auth/types/errors';

export interface ResetPasswordStoreInterface {
  isLoading: boolean;
  error: string | null;
  validationErrors: IErrors[];
}
