import * as React from 'react';

import MealComponent from 'components/meal/detail-meal';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetMealParams,
  mealActions,
  MealItem,
  mealReducerActions,
} from 'store';

export interface MealDetailProps {
  mealMonthList: MealItem[];
  getMealMonthStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MealMethod {
  getMeal(params: GetMealParams): void;
}

const DetailMealContainer: React.FC<MealDetailProps & MealMethod> = ({
  getMeal,
  mealMonthList,
  getMealMonthStatus,
  accessToken,
}) => {
  return (
    <MealComponent
      getMeal={getMeal}
      mealMonthList={mealMonthList}
      getMealMonthStatus={getMealMonthStatus}
      accessToken={accessToken}
    />
  );
};

const mapStateToProps = ({ user, meal }: AppState) => ({
  mealMonthList: meal.mealMonthList,
  getMealMonthStatus: meal.getMealMonthStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<mealReducerActions>) => ({
  getMeal: bindActionCreators(mealActions.getMeal, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailMealContainer);
