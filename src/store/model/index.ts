import { RegisterModel } from './register.model';
import { UserModel } from './user.model';
import { ExistModel } from './exist.model';

export interface AppState {
  register: RegisterModel;
  user: UserModel;
  exist: ExistModel;
}
