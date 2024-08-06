import { INotification } from '../../../../../../shared/store/auth/types/notification.interface';
import { ISolution } from '../../../../../../shared/types/models-interfaces';

export interface UserInfoStoreInterface {
  isLoading: boolean;
  message: INotification;
  solutions: ISolution[];
}
