import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  registerActions,
  registerReducerActions,
  RegisterParams,
  existReducerActions,
  existActions,
  ExistParamsType,
} from 'store';
import RegisterComponent from 'components/auth/register';

export interface RegisterProps {
  registerStatus: 'none' | 'pending' | 'success' | 'failure';
  idExistStatus: 'none' | 'pending' | 'success' | 'failure';
  signKey: string;
}

export interface RegisterMethod {
  register(data: RegisterParams): void;
  resetExist(): void;
  resetRegister(): void;
  idExist(data: string): void;
}

const RegisterContainer: React.SFC<
RegisterProps & RegisterMethod & RouteComponentProps
> = ({
  registerStatus,
  idExist,
  signKey,
  register,
  resetRegister,
  history,
  match,
  location,
  resetExist,
  idExistStatus,
}) => (
  <RegisterComponent
    signKey={signKey}
    register={register}
    idExist={idExist}
    registerStatus={registerStatus}
    resetRegister={resetRegister}
    history={history}
    match={match}
    location={location}
    resetExist={resetExist}
    idExistStatus={idExistStatus}
  />
);

const mapStateToProps = ({ register, exist }: AppState) => ({
  signKey: register.signKey,
  registerStatus: register.registerStatus,
  idExistStatus: exist.idExistStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<registerReducerActions & existReducerActions>,
) => ({
  register: bindActionCreators(registerActions.register, dispatch),
  resetRegister: bindActionCreators(registerActions.reset, dispatch),
  resetExist: bindActionCreators(existActions.reset, dispatch),
  idExist: bindActionCreators(existActions.idExist, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RegisterContainer),
);
