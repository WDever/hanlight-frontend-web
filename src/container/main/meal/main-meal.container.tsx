import MealComponent from 'components/main/meal';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  mealActions,
  MealItem,
  MealParams,
  mealReducerActions,
} from 'store';

export interface MealProps {
  mealList: MealItem[];
  mealStatus: 'none' | 'pending' | 'success' | 'failure';
  token: string;
}

export interface MealMethod {
  meal(params: MealParams): void;
}

const MealContainer: React.FC<MealProps & MealMethod> = ({
  meal,
  mealList,
  mealStatus,
  token,
}) => (
  <MealComponent
    meal={meal}
    mealList={mealList}
    mealStatus={mealStatus}
    token={token}
  />
);

const mapStateToProps = ({ user, meal }: AppState) => ({
  mealList: meal.mealList,
  mealStatus: meal.mealStatus,
  token: user.token,
});

const mapDispatchToProps = (dispatch: Dispatch<mealReducerActions>) => ({
  meal: bindActionCreators(mealActions.meal, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MealContainer);
