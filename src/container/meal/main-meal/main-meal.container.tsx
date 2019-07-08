import * as React from 'react';

import MainMealComponent from 'components/meal/main-meal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetMealOrderParams,
  GetMealParams,
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
}

const MainMealContainer: React.FC<MainMealProps & MainMealMethod> = ({
  getMeal,
  getMealOrder,
  mealWeekList,
  mealOrder,
  getMealWeekStatus,
  getMealOrderStatus,
  accessToken,
}) => {
  return (
    <MainMealComponent
      getMeal={getMeal}
      getMealOrder={getMealOrder}
      getMealOrderStatus={getMealOrderStatus}
      mealWeekList={mealWeekList}
      mealOrder={mealOrder}
      getMealWeekStatus={getMealWeekStatus}
      accessToken={accessToken}
    />
  );
};

const mapStateToProps = ({ user, meal }: AppState) => ({
  mealWeekList: meal.mealWeekList,
  mealOrder: meal.mealOrder,
  getMealWeekStatus: meal.getMealWeekStatus,
  getMealOrderStatus: meal.getMealOrderStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<mealReducerActions>) => ({
  getMeal: bindActionCreators(mealActions.getMeal, dispatch),
  getMealOrder: bindActionCreators(mealActions.getMealOrder, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealContainer);
