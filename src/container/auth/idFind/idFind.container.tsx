import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  userActions,
  userReducerActions,
  ExistParamsType,
  existReducerActions,
  existActions,
} from 'store';
import IdFindComponent from 'components/auth/idFind';

export interface IdFindProps {
  idFindStatus: 'none' | 'pending' | 'success' | 'failure';
  tpExistStatus: 'none' | 'pending' | 'success' | 'failure';
  idExistStatus: 'none' | 'pending' | 'success' | 'failure';
  id: string;
}

export interface IdFindMethod {
  idFind(code: string): void;
  idExist(data: string): void;
  tpExist(data: string): void;
  resetUser(): void;
  resetExist(): void;
}

const IdFindContainer: React.FC<
IdFindProps & IdFindMethod & RouteComponentProps
> = ({
  idFind,
  idFindStatus,
  tpExistStatus,
  idExistStatus,
  idExist,
  tpExist,
  resetUser,
  resetExist,
  id,
  history,
  match,
  location,
}) => (
  <IdFindComponent
    idFind={idFind}
    idFindStatus={idFindStatus}
    history={history}
    match={match}
    location={location}
    tpExistStatus={tpExistStatus}
    idExistStatus={idExistStatus}
    idExist={idExist}
    tpExist={tpExist}
    resetUser={resetUser}
    resetExist={resetExist}
    id={id}
  />
);

const mapStateToProps = ({ user, exist }: AppState) => ({
  idFindStatus: user.idFindStatus,
  tpExistStatus: exist.tpExistStatus,
  idExistStatus: exist.idExistStatus,
  id: user.id,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions & existReducerActions>) => ({
  idFind: bindActionCreators(userActions.idFind, dispatch),
  idExist: bindActionCreators(existActions.idExist, dispatch),
  tpExist: bindActionCreators(existActions.tpExist, dispatch),
  resetUser: bindActionCreators(userActions.reset, dispatch),
  resetExist: bindActionCreators(existActions.reset, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(IdFindContainer),
);
