import { MessageInterface } from '../../../../../../shared/store/auth/types/message.interface';
import { ISolution } from '../../../../../../shared/types/models-interfaces';

export interface UserInfoStoreInterface {
  isLoading: boolean;
  message: MessageInterface;
  solutions: ISolution[];
}
