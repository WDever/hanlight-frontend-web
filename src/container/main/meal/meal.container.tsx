import * as React from 'react';
import MealComponent from 'components/main/meal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { utilsActions, utilsReducerActions, MealParams, MealItem, AppState } from 'store';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface MealProps {
  mealList: MealItem[];
  mealStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface MealMethod {
  meal(params: MealParams): void;
}

const MealContainer: React.FC<MealProps & MealMethod & RouteComponentProps> = ({
  meal,
  mealList,
  location,
  match,
  history,
  mealStatus,
}) => {
  return (
    <MealComponent
      meal={meal}
      mealList={mealList}
      history={history}
      match={match}
      location={location}
      mealStatus={mealStatus}
    />
  );
};

const mapStateToProsp = ({ utils }: AppState) => ({
  mealList: utils.mealList,
  mealStatus: utils.mealStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<utilsReducerActions>) => ({
  meal: bindActionCreators(utilsActions.meal, dispatch),
});

export default withRouter(
  connect(
    mapStateToProsp,
    mapDispatchToProps,
  )(MealContainer),
);
