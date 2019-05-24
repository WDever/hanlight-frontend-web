import * as React from 'react';
import HeaderComponent from 'components/header';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { userReducerActions, userActions } from 'store';

export interface HeaderProps {}

export interface HeaderMethod {
  resetUser(): void;
}

const HeaderContainer: React.FC<
HeaderProps & HeaderMethod & RouteComponentProps
> = ({
  location, match, history, resetUser,
}) => {
  const name = localStorage.getItem('name');
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  resetUser: bindActionCreators(userActions.reset, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HeaderContainer),
);
