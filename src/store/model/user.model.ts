export interface UserModel {
  signKey: string;
  id: string;
  accessToken: string;
  data: {
    type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
    admin: number;
    name: string;
    major: string | null;
    grade: number | null;
    classNum: number | null;
    studentNum: number | null;
  };

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
}
