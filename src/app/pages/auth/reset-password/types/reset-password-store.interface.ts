import { ApiValiationsErrorsInterface } from '../../../../shared/store/auth/types/api-valiations-errors.interface';

export interface ResetPasswordStoreInterface {
  isLoading: boolean;
  error: string | null;
  validationErrors: ApiValiationsErrorsInterface[];
}
