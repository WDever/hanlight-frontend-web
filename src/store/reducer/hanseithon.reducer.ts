import { produce } from 'immer';
import { HanseithonModel, hanseithonReducerActions } from 'store';

const initialState: HanseithonModel = {
  deemStatus: false,
  modalType: 'none',
};

export const hanseithonReducer = (
  state: HanseithonModel = initialState,
  action: hanseithonReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'DEEM':
        draft.deemStatus = action.payload;
        break;

      case 'MODAL':
        draft.modalType = action.payload;
        break;

      default:
        break;
    }
  });
