import { produce } from 'immer';
import { UtilModel, utilReducerActions } from 'store';

const initialState: UtilModel = {
  toggleMenuStatus: false,
};

export const utilReducer = (
  state: UtilModel = initialState,
  action: utilReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'TOGGLE_MENU':
        draft.toggleMenuStatus = action.payload;
        break;

      default:
        break;
    }
  });
