import { produce } from 'immer';
import { userReducerActions } from '../action';
import { UserModel } from '../model/user.model';

const initialState: UserModel = {
  fbCode: '',
  signKey: '',
  id: '',
  token: '',
  data: {
    type: 'none',
    admin: 0,
    name: '',
    major: null,
    grade: null,
    classNum: null,
    studentNum: null,
  },

  verifyStatus: 'none',
  registerStatus: 'none',
  loginStatus: 'none',
  idRecoveryStatus: 'none',
  pwRecoveryStatus: 'none',
  idExistStatus: 'none',
  tpExistStatus: 'none',
  signKeyExistStatus: 'none',
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
        draft.token = action.payload.token;
        draft.data = {
          ...action.payload,
        };

        localStorage.setItem('token', action.payload.token);
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
        break;

      case 'PW_RECOVERY_FAILURE':
        draft.pwRecoveryStatus = 'failure';
        break;

      case 'VERIFY_PHONE':
        draft.verifyStatus = 'pending';
        break;

      case 'VERIFY_PHONE_SUCCESS':
        draft.verifyStatus = 'success';
        break;

      case 'VERIFY_PHONE_FAILURE':
        draft.verifyStatus = 'failure';
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

      case 'TP_EXIST':
        draft.tpExistStatus = 'pending';
        break;

      case 'TP_EXIST_SUCCESS_TRUE':
        draft.tpExistStatus = 'success-true';
        break;
      case 'TP_EXIST_SUCCESS_FALSE':
        draft.tpExistStatus = 'success-false';
        break;

      case 'TP_EXIST_FAILURE':
        draft.tpExistStatus = 'failure';
        break;

      case 'SIGN_KEY_EXIST':
        draft.signKeyExistStatus = 'pending';
        break;

      case 'SIGN_KEY_EXIST_SUCCESS_TRUE':
        draft.signKeyExistStatus = 'success-true';
        break;

      case 'SIGN_KEY_EXIST_SUCCESS_FALSE':
        draft.signKeyExistStatus = 'success-false';
        break;

      case 'SIGN_KEY_EXIST_FAILURE':
        draft.signKeyExistStatus = 'failure';
        break;

      case 'RESET':
        return initialState;
        break;

      case 'SET_FB_CODE':
        draft.fbCode = action.payload;
        break;

      case 'SET_ID':
        draft.id = action.payload;
        break;

      default:
        break;
    }
  });
