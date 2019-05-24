import { UserDataType } from '../action';


export interface UserModel {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  idFindStatus: 'none' | 'pending' | 'success' | 'failure';
  pwRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  id: string;
  userData: UserDataType;
}
