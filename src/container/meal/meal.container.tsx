import * as React from 'react';

import MainMealComponent from 'components/main/meal';
import MealComponent from 'components/meal/meal.component';
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

export interface MealProps {
  mealList: MealItem[];
  getMealStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MealMethod {
  getMeal(params: GetMealParams): void;
}

const MealContainer: React.FC<MealProps & MealMethod> = ({
  getMeal,
  mealList,
  getMealStatus,
  accessToken,
}) => {
  const mainMealComponent = (
    <MainMealComponent
      getMeal={getMeal}
      mealList={mealList}
      getMealStatus={getMealStatus}
      accessToken={accessToken}
    />
  );

  const mealComponent = (
    <MealComponent
      getMeal={getMeal}
      mealList={mealList}
      getMealStatus={getMealStatus}
      accessToken={accessToken}
    />
  );

  return (
    <Switch>
      <Route exact={true} path="/" render={() => mainMealComponent} />
      <Route exact={true} path="/meal" render={() => mealComponent} />
    </Switch>
  );
};

const mapStateToProps = ({ user, meal }: AppState) => ({
  mealList: meal.mealList,
  getMealStatus: meal.getMealStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<mealReducerActions>) => ({
  getMeal: bindActionCreators(mealActions.getMeal, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MealContainer);
