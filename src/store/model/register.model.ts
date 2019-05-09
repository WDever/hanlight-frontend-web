export interface RegisterModel {
  signKey: string;
  verifyStatus: 'none' | 'pending' | 'success' | 'failure';
  registerStatus: 'none' | 'pending' | 'success' | 'failure';
}
