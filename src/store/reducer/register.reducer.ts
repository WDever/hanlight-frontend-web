import { produce } from 'immer';
import { registerReducerActions } from '../action';
import { RegisterModel } from '../model/register.model';

const initialState: RegisterModel = {
  signKey: '',
  verifyStatus: 'none',
  registerStatus: 'none',
};

export const registerReducer = (
  state: RegisterModel = initialState,
  action: registerReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
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

    case 'RESET_REGISTER':
      return initialState;

    default:
      break;
  }
});
