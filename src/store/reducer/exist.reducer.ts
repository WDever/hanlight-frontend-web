import { produce } from 'immer';
import { existReducerActions } from '../action';
import { ExistModel } from '../model/exist.model';

const initialState: ExistModel = {
  existStatus: 'none',
  idExistStatus: false,
  tpExistStatus: false,
  signKeyExistStatus: false,
};

export const existReducer = (
  state: ExistModel = initialState,
  action: existReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
    case 'EXIST':
      draft.existStatus = 'pending';
      break;

    case 'EXIST_SUCCESS':
      draft.existStatus = 'success';
      break;

    case 'EXIST_FAILURE':
      draft.existStatus = 'failure';
      break;

    case 'ID_EXIST_SUCCESS':
      draft.idExistStatus = true;
      break;

    case 'ID_EXIST_FAILURE':
      draft.idExistStatus = false;
      break;

    case 'TP_EXISIT_SUCCESS':
      draft.tpExistStatus = true;
      break;

    case 'TP_EXISIT_FAILURE':
      draft.tpExistStatus = false;
      break;

    case 'SIGN_KEY_EXISIT_SUCCESS':
      draft.signKeyExistStatus = true;
      break;

    case 'SIGN_KEY_EXISIT_FAILURE':
      draft.signKeyExistStatus = false;
      break;

    case 'RESET_EXIST':
      return initialState;

    default:
      break;
  }
});
