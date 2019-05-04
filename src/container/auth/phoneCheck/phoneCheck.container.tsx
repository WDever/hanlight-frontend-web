import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import PhoneCheckComponent from 'components/auth/phoneCheck';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  PinType,
  VerifyPhoneParams,
  registerReducerActions,
  registerActions,
} from 'store';

export interface PhoneCheckProps {
  signKey: string;
  getStateStatus: 'none' | 'pending' | 'success' | 'failure';
  state: string;
  verifyStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface PhoneCheckMethod {
  getState(pin: PinType): void;
  verifyPhone(data: VerifyPhoneParams): void;
}

const PhoneCheckContainer: React.SFC<
PhoneCheckProps & PhoneCheckMethod & RouteComponentProps
> = ({
  getState,
  signKey,
  getStateStatus,
  state,
  verifyPhone,
  verifyStatus,
  history,
  match,
  location,
}) => (
  <PhoneCheckComponent
    getState={getState}
    signKey={signKey}
    getStateStatus={getStateStatus}
    state={state}
    history={history}
    match={match}
    location={location}
    verifyPhone={verifyPhone}
    verifyStatus={verifyStatus}
    // code={code}
    // getCodeStatus={getCodeStatus}
  />
);

const mapStateToProps = ({ register }: AppState) => ({
  // signKey: register.signKey,
  getStateStatus: register.getStateStatus,
  state: register.state,
  verifyStatus: register.verifyStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<registerReducerActions>) => ({
  getState: bindActionCreators(registerActions.getState, dispatch),
  verifyPhone: bindActionCreators(registerActions.verifyPhone, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PhoneCheckContainer),
);
