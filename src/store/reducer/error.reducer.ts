import { produce } from 'immer';
import { ErrorModel, errorReducerActions } from 'store';

const initialState: ErrorModel = {
  onError: 0,
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
        if (action.payload.err.response) {
          draft.onError += 1;
          draft.code = action.payload.err.response.data.code;
          draft.message = action.payload.err.response.data.message;
          draft.name = action.payload.err.response.data.name;
        } else {
          draft.onError += 1;
          draft.code = 0;
          draft.message = '네트워크 상태가 좋지 않습니다.';
          draft.name = 'Network Error';
        }
        break;

      case 'RESET_ERROR':
        return initialState;

      default:
        break;
    }
  });
