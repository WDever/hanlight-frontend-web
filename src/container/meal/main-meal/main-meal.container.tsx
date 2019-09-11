import * as React from 'react';

import MainMealComponent from 'components/meal/main-meal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetMealOrderParams,
  GetMealParams,
  hanlightMusicActions,
  hanlightMusicReducerActions,
  mealActions,
  MealItem,
  mealReducerActions,
} from 'store';

export interface MainMealProps {
  mealWeekList: MealItem[];
  mealOrder: string;
  getMealWeekStatus: 'none' | 'pending' | 'success' | 'failure';
  getMealOrderStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MainMealMethod {
  getMeal(params: GetMealParams): void;
  getMealOrder(params: GetMealOrderParams): void;
  toggleHM(params: boolean): void;
}

const mapStateToProps = ({ user, meal, hanlightMusic }: AppState) => ({
  mealWeekList: meal.mealWeekList,
  mealOrder: meal.mealOrder,
  getMealWeekStatus: meal.getMealWeekStatus,
  getMealOrderStatus: meal.getMealOrderStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (
  dispatch: Dispatch<mealReducerActions | hanlightMusicReducerActions>,
) => ({
  getMeal: bindActionCreators(mealActions.getMeal, dispatch),
  getMealOrder: bindActionCreators(mealActions.getMealOrder, dispatch),
  toggleHM: bindActionCreators(hanlightMusicActions.toggleHM, dispatch),
});

const MainMealContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealComponent);

export default MainMealContainer;
