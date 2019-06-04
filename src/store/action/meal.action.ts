import { Action } from 'redux';
import { MealItem } from 'store';
import { createStandardAction } from 'typesafe-actions';

export const MEAL = 'MEAL';
export const MEAL_SUCCESS = 'MEAL_SUCCESS';
export const MEAL_FAILURE = 'MEAL_FAILURE';
export const MEAL_ORDER = 'MEAL_ORDER';
export const MEAL_ORDER_SUCCESS = 'MEAL_ORDER_SUCCESS';
export const MEAL_ORDER_FAILURE = 'MEAL_ORDER_FAILURE';

export interface MealParams {
  accessToken: string | null;
  sort: string;
}

export interface MealResType {
  success: boolean;
  data: {
    meal: MealItem[];
  };
}

export interface MealOrderResType {
  success: boolean;
  data: {
    order: string;
  };
}

export class Meal implements Action {
  public readonly type = MEAL;

  public constructor(public payload: MealParams) {}
}

export class MealSuccess implements Action {
  public readonly type = MEAL_SUCCESS;

  public constructor(public payload: MealResType) {}
}

export class MealFailure implements Action {
  public readonly type = MEAL_FAILURE;
}

export class MealOrder implements Action {
  public readonly type = MEAL_ORDER;

  public constructor(public payload: string) {}
}

export class MealOrderSuccess implements Action {
  public readonly type = MEAL_ORDER_SUCCESS;

  public constructor(public payload: MealOrderResType) {}
}

export class MealOrderFailure implements Action {
  public readonly type = MEAL_ORDER_FAILURE;
}

export const mealActions = {
  meal: createStandardAction(MEAL)<MealParams>(),
  mealOrder: createStandardAction(MEAL_ORDER)<string>(),
};

export type mealReducerActions =
  | Meal
  | MealSuccess
  | MealFailure
  | MealOrder
  | MealOrderSuccess
  | MealOrderFailure;
