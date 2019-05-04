import { RegisterModel } from './register.model';
import { UserModel } from './user.model';

export interface AppState {
  register: RegisterModel;
  user: UserModel;
}
