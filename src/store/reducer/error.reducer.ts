import { produce } from 'immer';
import { ErrorModel, errorReducerActions } from 'store';

const initialState: ErrorModel = {
  onError: false,
  code: 0,
  message: '',
  name: '',
};

export const errorReducer = (
  state: ErrorModel = initialState,
  action: errorReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'SET_ERROR':
        draft.onError = true;
        draft.code = action.payload.code;
        draft.message = action.payload.message;
        draft.name = action.payload.name;
        break;

      case 'RESET_ERROR':
        return initialState;

      default:
        break;
    }
  });
