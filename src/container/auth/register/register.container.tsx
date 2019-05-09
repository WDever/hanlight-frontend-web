
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  registerActions,
  registerReducerActions,
  RegisterParams,
} from 'store';
import RegisterComponent from 'components/auth/register';

export interface RegisterProps {
  registerStatus: 'none' | 'pending' | 'success' | 'failure';
  signKey: string;
}

export interface RegisterMethod {
  register(data: RegisterParams): void;
}

const RegisterContainer: React.SFC<
RegisterProps & RegisterMethod & RouteComponentProps
> = ({
  registerStatus, signKey, register, history, match, location,
}) => (
  <RegisterComponent
    signKey={signKey}
    register={register}
    registerStatus={registerStatus}
    history={history}
    match={match}
    location={location}
  />
);

const mapStateToProps = ({ register }: AppState) => ({
  signKey: register.signKey,
  registerStatus: register.registerStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<registerReducerActions>) => ({
  register: bindActionCreators(registerActions.register, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RegisterContainer),
);
