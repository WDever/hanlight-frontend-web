import * as React from 'react';
import MealComponent from 'components/main/meal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  utilsActions,
  utilsReducerActions,
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

const mapStateToProsp = ({ utils }: AppState) => ({
  mealList: utils.mealList,
  mealStatus: utils.mealStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<utilsReducerActions>) => ({
  meal: bindActionCreators(utilsActions.meal, dispatch),
});

export default connect(
  mapStateToProsp,
  mapDispatchToProps,
)(MealContainer);
