import * as React from 'react';

import RegisterComponent from 'components/user/register';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  RegisterParam,
  userActions,
  userReducerActions,
} from 'store';

export interface RegisterProps {
  registerStatus: 'none' | 'pending' | 'success' | 'failure';
  idExistStatus:
    | 'none'
    | 'pending'
    | 'success-true'
    | 'success-false'
    | 'failure';
  signKey: string;
}

export interface RegisterMethod {
  register(data: RegisterParam): void;
  resetUser(): void;
  idExist({ id }: { id: string }): void;
}

const RegisterContainer: React.SFC<RegisterProps &
  RegisterMethod &
  RouteComponentProps> = ({
  registerStatus,
  idExist,
  signKey,
  register,
  history,
  match,
  location,
  resetUser,
  idExistStatus,
}) => (
  <RegisterComponent
    signKey={signKey}
    register={register}
    idExist={idExist}
    registerStatus={registerStatus}
    history={history}
    match={match}
    location={location}
    resetUser={resetUser}
    idExistStatus={idExistStatus}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  signKey: user.signKey,
  registerStatus: user.registerStatus,
  idExistStatus: user.idExistStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  register: bindActionCreators(userActions.register, dispatch),
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
  idExist: bindActionCreators(userActions.idExist, dispatch),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterContainer),
);
