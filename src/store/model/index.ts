import { UserModel } from './user.model';
import { UtilsModel } from './utils.model';

export interface AppState {
  user: UserModel;
  utils: UtilsModel;
}
