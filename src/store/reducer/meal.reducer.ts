import { produce } from 'immer';
import { MealModel, mealReducerActions } from 'store';

const initialState: MealModel = {
  mealStatus: 'none',
  mealOrderStatus: 'none',
  mealList: [],
  mealOrder: '',
};

export const mealReducer = (
  state: MealModel = initialState,
  action: mealReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
    case 'MEAL':
      draft.mealStatus = 'pending';
      break;

    case 'MEAL_SUCCESS':
      draft.mealStatus = 'success';
      draft.mealList = action.payload.data.meal;
      break;

    case 'MEAL_FAILURE':
      draft.mealStatus = 'failure';
      break;

    case 'MEAL_ORDER':
      draft.mealOrderStatus = 'pending';
      break;

    case 'MEAL_ORDER_SUCCESS':
      draft.mealOrderStatus = 'success';
      draft.mealOrder = action.payload.data.order;
      break;

    case 'MEAL_ORDER_FAILURE':
      draft.mealOrderStatus = 'failure';
      break;

    default:
      break;
  }
});
