import { IValidationError } from '../../../../../../shared/store/auth/types/validation-error.interface';
import { INotification } from '../../../../../../shared/store/auth/types/notification.interface';

export interface UpdatePasswordStoreInterface {
  isLoading: boolean;
  message: INotification;
  errors: IValidationError[];
}
