import MealComponent from 'components/main/meal';
import * as React from 'react';
import { connect } from 'react-redux';
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
}) => (
  <MealComponent
    getMeal={getMeal}
    mealList={mealList}
    getMealStatus={getMealStatus}
    accessToken={accessToken}
  />
);

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
