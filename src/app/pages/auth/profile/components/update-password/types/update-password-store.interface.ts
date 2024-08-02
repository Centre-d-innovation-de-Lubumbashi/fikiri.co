import { IErrors } from '../../../../../../shared/store/auth/types/errors';
import { MessageInterface } from '../../../../../../shared/store/auth/types/message.interface';

export interface UpdatePasswordStoreInterface {
  isLoading: boolean;
  message: MessageInterface;
  errors: IErrors[];
}
