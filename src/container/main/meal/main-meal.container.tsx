import * as React from 'react';
import MealComponent from 'components/main/meal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  mealActions,
  mealReducerActions,
  MealParams,
  MealItem,
  AppState,
} from 'store';

export interface MealProps {
  mealList: MealItem[];
  mealStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface MealMethod {
  meal(params: MealParams): void;
}

const MealContainer: React.FC<MealProps & MealMethod> = ({
  meal,
  mealList,
  mealStatus,
}) => (
  <MealComponent meal={meal} mealList={mealList} mealStatus={mealStatus} />
);

const mapStateToProsp = ({ meal }: AppState) => ({
  mealList: meal.mealList,
  mealStatus: meal.mealStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<mealReducerActions>) => ({
  meal: bindActionCreators(mealActions.meal, dispatch),
});

export default connect(
  mapStateToProsp,
  mapDispatchToProps,
)(MealContainer);
