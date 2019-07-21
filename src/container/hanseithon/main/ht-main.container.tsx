import HTMainComponent from 'components/hanseithon/main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  hanseithonActions,
  hanseithonReducerActions,
  userReducerActions,
} from 'store';

export interface HTMainProps {
  deemStatus: boolean;
  errMessage: string;
  accessToken: string;
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  postObserverStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface HTMainMethod {
  deem(payload: boolean): void;
  postObserver(payload: string): void;
  resetStatus(): void;
}

export interface HTMainOwnProps {}

const mapStateToProps = ({ hanseithon, error, user }: AppState) => ({
  deemStatus: hanseithon.deemStatus,
  errMessage: error.message,
  accessToken: user.accessToken,
  userType: user.type,
  postObserverStatus: hanseithon.postObserverStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  postObserver: bindActionCreators(hanseithonActions.postObserver, dispatch),
  resetStatus: bindActionCreators(hanseithonActions.resetStatus, dispatch),
});

const HTMainContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HTMainComponent),
);

export default HTMainContainer;
