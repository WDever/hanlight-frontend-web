export interface ExistModel {
  existStatus: 'none' | 'pending' | 'success' | 'failure';
  idExistStatus: boolean;
  tpExistStatus: boolean;
  signKeyExistStatus: boolean;
}
