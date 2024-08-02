import { ApiValiationsErrorsInterface } from '../../../../../../shared/store/auth/types/api-valiations-errors.interface';
import { MessageInterface } from '../../../../../../shared/store/auth/types/message.interface';

export interface UpdateInfoStoreInterface {
  isLoading: boolean;
  message: MessageInterface;
  errors: ApiValiationsErrorsInterface[];
}
