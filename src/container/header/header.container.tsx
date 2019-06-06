import HeaderComponent from 'components/header';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, userActions, userReducerActions } from 'store';

export interface HeaderProps {
  name: string;
}

export interface HeaderMethod {
  resetUser(): void;
}

const HeaderContainer: React.FC<
  HeaderProps & HeaderMethod & RouteComponentProps
> = ({ location, match, history, resetUser, name }) => {
  return (
    <HeaderComponent
      name={name}
      history={history}
      location={location}
      match={match}
      resetUser={resetUser}
    />
  );
};

const mapStateToProps = ({ user }: AppState) => ({
  name: user.data.name,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HeaderContainer),
);
