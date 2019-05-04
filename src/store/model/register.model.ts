export interface RegisterModel {
  signKey: string;
  getStateStatus: 'none' | 'pending' | 'success' | 'failure';
  state: string;
  verifyStatus: 'none' | 'pending' | 'success' | 'failure';
  registerStatus: 'none' | 'pending' | 'success' | 'failure';
}
