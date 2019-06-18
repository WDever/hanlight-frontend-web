import * as React from 'react';

import MainMealComponent from 'components/meal/main-meal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetMealParams,
  mealActions,
  MealItem,
  mealReducerActions,
} from 'store';

export interface MainMealProps {
  mealWeekList: MealItem[];
  getMealWeekStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MainMealMethod {
  getMeal(params: GetMealParams): void;
}

const MainMealContainer: React.FC<
  MainMealProps & MainMealMethod
> = ({
  getMeal,
  mealWeekList,
  getMealWeekStatus,
  accessToken,
}) => {
  return (
    <MainMealComponent
      getMeal={getMeal}
      mealWeekList={mealWeekList}
      getMealWeekStatus={getMealWeekStatus}
      accessToken={accessToken}
    />
  );
};

const mapStateToProps = ({ user, meal }: AppState) => ({
  mealWeekList: meal.mealWeekList,
  getMealWeekStatus: meal.getMealWeekStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<mealReducerActions>) => ({
  getMeal: bindActionCreators(mealActions.getMeal, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMealContainer);
