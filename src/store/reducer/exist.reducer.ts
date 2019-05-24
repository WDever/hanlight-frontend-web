import { produce } from 'immer';
import { existReducerActions } from '../action';
import { ExistModel } from '../model/exist.model';

const initialState: ExistModel = {
  idExistStatus: 'none',
  tpExistStatus: 'none',
  signKeyExistStatus: 'none',
};

export const existReducer = (
  state: ExistModel = initialState,
  action: existReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
    case 'ID_EXIST':
      draft.idExistStatus = 'pending';
      break;

    case 'ID_EXIST_SUCCESS':
      draft.idExistStatus = 'success';
      break;

    case 'ID_EXIST_FAILURE':
      draft.idExistStatus = 'failure';
      break;

    case 'TP_EXIST':
      draft.tpExistStatus = 'pending';
      break;

    case 'TP_EXIST_SUCCESS':
      draft.tpExistStatus = 'success';
      break;

    case 'TP_EXIST_FAILURE':
      draft.tpExistStatus = 'failure';
      break;

    case 'SIGN_KEY_EXIST':
      draft.signKeyExistStatus = 'pending';
      break;

    case 'SIGN_KEY_EXISIT_SUCCESS':
      draft.signKeyExistStatus = 'success';
      break;

    case 'SIGN_KEY_EXISIT_FAILURE':
      draft.signKeyExistStatus = 'failure';
      break;

    case 'RESET_EXIST':
      return initialState;

    default:
      break;
  }
});
