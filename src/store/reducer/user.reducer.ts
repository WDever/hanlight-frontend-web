import { produce } from 'immer';
import { userReducerActions } from '../action';
import { UserModel } from '../model/user.model';

const initialState: UserModel = {
  loginStatus: 'none',
  idFindStatus: 'none',
  pwRecoveryStatus: 'none',
  id: '',
  userData: {
    accessToken: '',
    user: {
      type: 'none',
      admin: false,
      name: '',
      major: '',
      grade: '',
      classNum: '',
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

    case 'ID_FIND':
      draft.idFindStatus = 'pending';
      break;

    case 'ID_FIND_SUCCESS':
      draft.idFindStatus = 'success';
      draft.id = action.payload.id;
      break;

    case 'ID_FIND_FAILURE':
      draft.idFindStatus = 'failure';
      break;

    case 'PW_RECOVERY':
      draft.pwRecoveryStatus = 'pending';
      break;

    case 'PW_RECOVERY_SUCCESS':
      draft.pwRecoveryStatus = 'success';
      break;

    case 'PW_RECOVERY_FAILURE':
      draft.pwRecoveryStatus = 'failure';
      break;

    case 'RESET_USER':
      draft.idFindStatus = 'none';
      draft.pwRecoveryStatus = 'none';
      break;

    default:
      break;
  }
});
