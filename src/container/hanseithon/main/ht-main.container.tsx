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
  errMessage: string;
  accessToken: string;
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  getThemeStatus: 'none' | 'pending' | 'success' | 'failure';
  getJudgementStatus: 'none' | 'pending' | 'success' | 'failure';
  themeUrl: string;
  judgementUrl: string;
  userName: string;
}

export interface HTMainMethod {
  resetStatus(): void;
  getTheme(payload: string): void;
  getJudgement(payload: string): void;
}

export interface HTMainOwnProps {}

const mapStateToProps = ({ hanseithon, error, user }: AppState) => ({
  deemStatus: hanseithon.deemStatus,
  errMessage: error.message,
  accessToken: user.accessToken,
  userType: user.type,
  postObserverStatus: hanseithon.postObserverStatus,
  getThemeStatus: hanseithon.getThemeStatus,
  getJudgementStatus: hanseithon.getJudgementStatus,
  themeUrl: hanseithon.themeUrl,
  judgementUrl: hanseithon.judgementUrl,
  userName: user.name,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  postObserver: bindActionCreators(hanseithonActions.postObserver, dispatch),
  resetStatus: bindActionCreators(hanseithonActions.resetStatus, dispatch),
  getTheme: bindActionCreators(hanseithonActions.getTheme, dispatch),
  getJudgement: bindActionCreators(hanseithonActions.getJudgement, dispatch),
});

const HTMainContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HTMainComponent),
);

export default HTMainContainer;
