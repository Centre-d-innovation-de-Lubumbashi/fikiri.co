import { IErrors } from '../../../../shared/store/auth/types/errors';

export interface RegisterStoreInterface {
  isLoading: boolean;
  error: string | null;
  validationErrors: IErrors[];
}
