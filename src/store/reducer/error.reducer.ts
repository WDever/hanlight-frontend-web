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
        console.log(action);
        if (action.payload.status) {
          draft.onError += 1;
          draft.code = action.payload.data.code;
          draft.message = action.payload.data.message;
          draft.name = action.payload.data.name;
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
