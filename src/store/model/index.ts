import { RegisterModel } from './register.model';
import { UserModel } from './user.model';
import { ExistModel } from './exist.model';
import { UtilsModel } from './utils.model';

export interface AppState {
  register: RegisterModel;
  user: UserModel;
  exist: ExistModel;
  utils: UtilsModel;
}
