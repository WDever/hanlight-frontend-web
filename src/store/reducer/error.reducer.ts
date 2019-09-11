import { produce } from 'immer';
import moment from 'moment';
import { ErrorModel, errorReducerActions } from 'store';

const initialState: ErrorModel = {
  onError: 0,
  code: -1,
  message: '',
  name: '',
  time: null,
};

export const errorReducer = (
  state: ErrorModel = initialState,
  action: errorReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'SET_ERROR':
        console.log(action.payload);
        if (action.payload.err.response) {
          draft.onError += 1;
          draft.code = action.payload.err.response.data.code;
          draft.message = action.payload.err.response.data.message;
          draft.name = action.payload.err.response.data.name;
          draft.time = moment().unix();
        } else if (
          !state.time ||
          state.code ||
          moment().unix() - state.time >= 5
        ) {
          draft.onError += 1;
          draft.code = 0;
          draft.message =
            '네트워크 상태가 좋지 않습니다. 새로고침하여 요청을 완료해주세요.';
          draft.name = 'Network Error';
          draft.time = moment().unix();
        }
        break;

      case 'RESET_ERROR':
        return initialState;

      default:
        break;
    }
  });
