import { produce } from 'immer';
import { festivalActions, FestivalModel, festivalReducerActions } from 'store';

const initialState: FestivalModel = {
  modalData: {
    status: false,
    data: {
      type: '',
      content: '',
      acceptEvent() {},
    },
  },
};

export const festivalReducer = (
  state: FestivalModel = initialState,
  action: festivalReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'TOGGLE_MODAL':
        if (action.payload.status && action.payload.data) {
          draft.modalData.status = true;
          draft.modalData.data = action.payload.data;
        } else if (!action.payload.status) {
          draft.modalData.status = false;
          draft.modalData.data = {
            type: '',
            content: '',
            acceptEvent() {},
          };
        }
        console.log(action.payload);
        console.log(state.modalData);
        break;

      default:
        break;
    }
  });
