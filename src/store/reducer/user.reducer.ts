import { produce } from 'immer';
import { userReducerActions } from '../action';
import { UserModel } from '../model/user.model';

const initialState: UserModel = {
  loginStatus: 'none',
  userData: {
    accessToken: '',
    user: {
      type: '',
      admin: false,
      name: '',
      major: '',
      grade: '',
      className: '',
      studentNum: '',
    },
  },
};

export const userReducer = (
  state: UserModel = initialState,
  action: userReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
    case 'LOGIN':
      draft.loginStatus = 'pending';
      break;

    case 'LOGIN_SUCCESS':
      draft.loginStatus = 'success';
      draft.userData.accessToken = action.payload.data.accessToken;
      draft.userData.user = action.payload.data.user;
      break;

    case 'LOGIN_FAILURE':
      draft.loginStatus = 'failure';
      break;

    default:
      break;
  }
});
