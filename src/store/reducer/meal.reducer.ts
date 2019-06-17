import { produce } from 'immer';
import { MealModel, mealReducerActions } from 'store';

const initialState: MealModel = {
  getMealWeekStatus: 'none',
  getMealMonthStatus: 'none',
  getMealOrderStatus: 'none',
  mealWeekList: [],
  mealMonthList: [],
  mealOrder: '',
};

export const mealReducer = (
  state: MealModel = initialState,
  action: mealReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_MEAL':
        draft.getMealWeekStatus = 'pending';
        draft.getMealMonthStatus = 'pending';
        break;

      case 'GET_MEAL_WEEK_SUCCESS':
        draft.getMealWeekStatus = 'success';
        draft.getMealMonthStatus = 'none';
        draft.mealWeekList = action.payload.data.meal;
        break;

      case 'GET_MEAL_WEEK_FAILURE':
        draft.getMealWeekStatus = 'failure';
        draft.getMealMonthStatus = 'none';
        break;

      case 'GET_MEAL_MONTH_SUCCESS':
        draft.getMealMonthStatus = 'success';
        draft.getMealWeekStatus = 'none';
        draft.mealMonthList = action.payload.data.meal;
        break;

      case 'GET_MEAL_MONTH_FAILURE':
        draft.getMealMonthStatus = 'failure';
        draft.getMealWeekStatus = 'none';
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
