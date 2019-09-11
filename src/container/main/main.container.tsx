import MainComponent from 'components/main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  hanlightMusicActions,
  userActions,
  userReducerActions,
} from 'store';

export interface MainProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  toggleMenuStatus: boolean;
  toggleHMStatus: boolean;
}

export interface MainMethod {
  resetUser(): void;
}

const mapStateToProps = ({ user, util, hanlightMusic }: AppState) => ({
  loginStatus: user.loginStatus,
  toggleMenuStatus: util.toggleMenuStatus,
  toggleHMStatus: hanlightMusic.toggleHMstatus,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
});

const MainCotainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainComponent),
);

export default MainCotainer;
