import * as React from 'react';
import HeaderComponent from 'components/header';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { userReducerActions, userActions, AppState } from 'store';

export interface HeaderProps {
  name: string;
}

export interface HeaderMethod {
  reset(): void;
}

const HeaderContainer: React.FC<
  HeaderProps & HeaderMethod & RouteComponentProps
> = ({ location, match, history, reset, name }) => {
  return (
    <HeaderComponent
      name={name}
      history={history}
      location={location}
      match={match}
      reset={reset}
    />
  );
};

const mapStateToProps = ({ user }: AppState) => ({
  name: user.data.name,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  reset: bindActionCreators(userActions.reset, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HeaderContainer),
);
