export interface UserModel {
  id: string;
  signKey: string;
  accessToken: string;
  type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  admin: number;
  name: string;
  major: string | null;
  grade: number | null;
  classNum: number | null;
  studentNum: number | null;
  image: string | null;

  verifyPhoneStatus: 'none' | 'pending' | 'success' | 'failure';
  registerStatus: 'none' | 'pending' | 'success' | 'failure';
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  idRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  pwRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  idExistStatus:
    | 'none'
    | 'pending'
    | 'success-true'
    | 'success-false'
    | 'failure';
  tpExistStatus:
    | 'none'
    | 'pending'
    | 'success-true'
    | 'success-false'
    | 'failure';
  signKeyExistStatus:
    | 'none'
    | 'pending'
    | 'success-true'
    | 'success-false'
    | 'failure';
  getUserStatus: 'none' | 'pending' | 'success' | 'failure';
  patchPasswordStatus: 'none' | 'pending' | 'success' | 'failure';
  patchPhoneStatus: 'none' | 'pending' | 'success' | 'failure';
  postUserImgStatus: 'none' | 'pending' | 'success' | 'failure';
}
