import { MessageInterface } from '../../../../../../shared/store/auth/types/message.interface';
import { Solution } from '../../../../../../shared/types/models-interfaces';

export interface UserInfoStoreInterface {
  isLoading: boolean;
  message: MessageInterface;
  solutions: Solution[];
}
