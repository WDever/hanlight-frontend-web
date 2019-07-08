import { Action } from 'redux';
import { MealItem } from 'store';
import { createStandardAction } from 'typesafe-actions';

export const GET_MEAL = 'GET_MEAL';
export const GET_MEAL_WEEK_SUCCESS = 'GET_MEAL_WEEK_SUCCESS';
export const GET_MEAL_WEEK_FAILURE = 'GET_MEAL_WEEK_FAILURE';
export const GET_MEAL_MONTH_SUCCESS = 'GET_MEAL_MONTH_SUCCESS';
export const GET_MEAL_MONTH_FAILURE = 'GET_MEAL_MONTH_FAILURE';
export const GET_MEAL_ORDER = 'GET_MEAL_ORDER';
export const GET_MEAL_ORDER_SUCCESS = 'GET_MEAL_ORDER_SUCCESS';
export const GET_MEAL_ORDER_FAILURE = 'GET_MEAL_ORDER_FAILURE';

export interface GetMealParams {
  accessToken: string | null;
  sort: 'month' | 'week';
  month?: number;
}

export interface GetMealOrderParams {
  accessToken: string;
}

export interface GetMealResType {
  success: boolean;
  data: {
    meal: MealItem[];
  };
}

export interface GetMealOrderResType {
  success: boolean;
  data: {
    order: string;
  };
}

export class GetMeal implements Action {
  public readonly type = GET_MEAL;

  public constructor(public payload: GetMealParams) {}
}

export class GetMealWeekSuccess implements Action {
  public readonly type = GET_MEAL_WEEK_SUCCESS;

  public constructor(public payload: GetMealResType) {}
}

export class GetMealWeekFailure implements Action {
  public readonly type = GET_MEAL_WEEK_FAILURE;
}

export class GetMealMonthSuccess implements Action {
  public readonly type = GET_MEAL_MONTH_SUCCESS;

  public constructor(public payload: GetMealResType) {}
}

export class GetMealMonthFailure implements Action {
  public readonly type = GET_MEAL_MONTH_FAILURE;
}

export class GetMealOrder implements Action {
  public readonly type = GET_MEAL_ORDER;

  public constructor(public payload: GetMealOrderParams) {}
}

export class GetMealOrderSuccess implements Action {
  public readonly type = GET_MEAL_ORDER_SUCCESS;

  public constructor(public payload: GetMealOrderResType) {}
}

export class GetMealOrderFailure implements Action {
  public readonly type = GET_MEAL_ORDER_FAILURE;
}

export const mealActions = {
  getMeal: createStandardAction(GET_MEAL)<GetMealParams>(),
  getMealOrder: createStandardAction(GET_MEAL_ORDER)<GetMealOrderParams>(),
};

export type mealReducerActions =
  | GetMeal
  | GetMealWeekSuccess
  | GetMealWeekFailure
  | GetMealMonthSuccess
  | GetMealMonthFailure
  | GetMealOrder
  | GetMealOrderSuccess
  | GetMealOrderFailure;
