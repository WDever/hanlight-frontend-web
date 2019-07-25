import MainComponent from 'components/main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  hanseithonActions,
  hanseithonReducerActions,
  userActions,
  userReducerActions,
} from 'store';

export interface MainProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  toggleMenuStatus: boolean;
}

export interface MainMethod {
  resetUser(): void;
  resetHtUser(): void;
}

const mapStateToProps = ({ user, util }: AppState) => ({
  loginStatus: user.loginStatus,
  toggleMenuStatus: util.toggleMenuStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<userReducerActions | hanseithonReducerActions>,
) => ({
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
  resetHtUser: bindActionCreators(hanseithonActions.resetHtUser, dispatch),
});

const MainCotainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainComponent),
);

export default MainCotainer;
