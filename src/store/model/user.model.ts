export interface UserModel {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  idFindStatus: 'none' | 'pending' | 'success' | 'failure';
  pwRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  id: string;
  userData: {
    accessToken: string;
    user: {
      type: string;
      admin: boolean;
      name: string;
      major: string;
      grade: string;
      classNum: string;
      studentNum: string;
    };
  };
}
