import { produce } from 'immer';
import { MealModel, mealReducerActions } from 'store';

const initialState: MealModel = {
  getMealStatus: 'none',
  getMealOrderStatus: 'none',
  mealList: [],
  mealOrder: '',
};

export const mealReducer = (
  state: MealModel = initialState,
  action: mealReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_MEAL':
        draft.getMealStatus = 'pending';
        break;

      case 'GET_MEAL_SUCCESS':
        draft.getMealStatus = 'success';
        draft.mealList = action.payload.data.meal;
        break;

      case 'GET_MEAL_FAILURE':
        draft.getMealStatus = 'failure';
        break;

      case 'GET_MEAL_ORDER':
        draft.getMealOrderStatus = 'pending';
        break;

      case 'GET_MEAL_ORDER_SUCCESS':
        draft.getMealOrderStatus = 'success';
        draft.mealOrder = action.payload.data.order;
        break;

      case 'GET_MEAL_ORDER_FAILURE':
        draft.getMealOrderStatus = 'failure';
        break;

      default:
        break;
    }
  });
