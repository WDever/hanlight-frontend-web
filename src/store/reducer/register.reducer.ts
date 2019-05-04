import { produce } from 'immer';
import { registerReducerActions } from '../action';
import { RegisterModel } from '../model/register.model';

const initialState: RegisterModel = {
  signKey: '',
  getStateStatus: 'none',
  state: '',
  verifyStatus: 'none',
  registerStatus: 'none',
};

export const registerReducer = (
  state: RegisterModel = initialState,
  action: registerReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
    case 'GET_STATE':
      console.log(action.payload);
      draft.signKey = action.payload;
      draft.getStateStatus = 'pending';
      break;

    case 'GET_STATE_SUCCESS':
      console.log(action.payload);
      draft.state = action.payload.state;
      draft.getStateStatus = 'success';
      break;

    case 'GET_STATE_FAILURE':
      draft.getStateStatus = 'failure';
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

    default:
      break;
  }
});
