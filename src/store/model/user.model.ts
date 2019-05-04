export interface UserModel {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  userData: {
    accessToken: string;
    user: {
      type: string;
      admin: boolean;
      name: string;
      major: string;
      grade: string;
      className: string;
      studentNum: string;
    };
  };
}
