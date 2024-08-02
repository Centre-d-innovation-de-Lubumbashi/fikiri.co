import { IErrors } from '../../../../shared/store/auth/types/errors';

export interface ResetPasswordRequestStoreInterface {
  isLoading: boolean;
  error: string | null;
  validationErrors: IErrors[];
}
