import { produce } from 'immer';
import { userReducerActions } from '../action';
import { UserModel } from '../model/user.model';

const initialState: UserModel = {
  signKey: '',
  id: '',
  accessToken: '',
  type: 'none',
  admin: 0,
  name: '',
  major: null,
  grade: null,
  classNum: null,
  studentNum: null,

  verifyPhoneStatus: 'none',
  registerStatus: 'none',
  loginStatus: 'none',
  idRecoveryStatus: 'none',
  pwRecoveryStatus: 'none',
  idExistStatus: 'none',
  tpExistStatus: 'none',
  signKeyExistStatus: 'none',
  getUserStatus: 'none',
  patchPasswordStatus: 'none',
  patchPhoneStatus: 'none',
  postUserImgStatus: 'none',
};

export const userReducer = (
  state: UserModel = initialState,
  action: userReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOGIN':
        draft.loginStatus = 'pending';
        break;

      case 'LOGIN_SUCCESS':
        draft.loginStatus = 'success';
        draft.accessToken = action.payload.accessToken;
        Object.assign(draft, {
          ...action.payload.user,
        });

        localStorage.setItem('accessToken', action.payload.accessToken);
        break;

      case 'LOGIN_FAILURE':
        draft.loginStatus = 'failure';
        break;

      case 'ID_RECOVERY':
        draft.idRecoveryStatus = 'pending';
        break;

      case 'ID_RECOVERY_SUCCESS':
        draft.idRecoveryStatus = 'success';
        draft.id = action.payload.id;
        break;

      case 'ID_RECOVERY_FAILURE':
        draft.idRecoveryStatus = 'failure';
        break;

      case 'PW_RECOVERY':
        draft.pwRecoveryStatus = 'pending';
        break;

      case 'PW_RECOVERY_SUCCESS':
        draft.pwRecoveryStatus = 'success';
        draft.accessToken = action.payload.accessToken;
        break;

      case 'PW_RECOVERY_FAILURE':
        draft.pwRecoveryStatus = 'failure';
        break;

      case 'VERIFY_PHONE':
        draft.verifyPhoneStatus = 'pending';
        break;

      case 'VERIFY_PHONE_SUCCESS':
        draft.verifyPhoneStatus = 'success';
        break;

      case 'VERIFY_PHONE_FAILURE':
        draft.verifyPhoneStatus = 'failure';
        break;

      case 'REGISTER':
        draft.registerStatus = 'pending';
        break;

      case 'REGISTER_SUCCESS':
        draft.registerStatus = 'success';
        break;

      case 'REGISTER_FAILURE':
        draft.registerStatus = 'failure';
        break;

      case 'SET_SIGN_KEY':
        draft.signKey = action.payload;
        break;

      case 'ID_EXIST':
        draft.idExistStatus = 'pending';
        break;

      case 'ID_EXIST_SUCCESS_TRUE':
        draft.idExistStatus = 'success-true';
        break;
      case 'ID_EXIST_SUCCESS_FALSE':
        draft.idExistStatus = 'success-false';
        break;

      case 'ID_EXIST_FAILURE':
        draft.idExistStatus = 'failure';
        break;

      case 'RESET_USER':
        localStorage.clear();
        return initialState;

      case 'GET_USER':
        draft.getUserStatus = 'pending';
        draft.loginStatus = 'pending';
        break;
      case 'GET_USER_SUCCESS':
        draft.getUserStatus = 'success';
        draft.loginStatus = 'success';
        Object.assign(draft, {
          ...action.payload.user,
        });
        draft.accessToken = action.payload.token;
        break;
      case 'GET_USER_FAILURE':
        draft.getUserStatus = 'failure';
        draft.loginStatus = 'failure';
        localStorage.clear();
        break;

      case 'PATCH_PASSWORD':
        draft.patchPasswordStatus = 'pending';
        break;
      case 'PATCH_PASSWORD_SUCCESS':
        draft.patchPasswordStatus = 'success';
        break;
      case 'PATCH_PASSWORD_FAILURE':
        draft.patchPasswordStatus = 'failure';
        break;

      case 'PATCH_PHONE':
        draft.patchPhoneStatus = 'pending';
        break;
      case 'PATCH_PHONE_SUCCESS':
        draft.patchPhoneStatus = 'success';
        break;
      case 'PATCH_PHONE_FAILURE':
        draft.patchPhoneStatus = 'failure';
        break;

      case 'POST_USER_IMG':
        draft.postUserImgStatus = 'pending';
        break;

      case 'POST_USER_IMG_SUCCESS':
        draft.postUserImgStatus = 'success';
        break;

      case 'POST_USER_IMG_FAILURE':
        draft.postUserImgStatus = 'failure';
        break;

      default:
        break;
    }
  });
