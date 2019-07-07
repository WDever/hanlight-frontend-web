import MainComponent from 'components/main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, userActions, userReducerActions } from 'store';

export interface MainProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  toggleMenuStatus: boolean;
}

export interface MainMethod {
  resetUser(): void;
}

const mapStateToProps = ({ user, util }: AppState) => ({
  loginStatus: user.loginStatus,
  toggleMenuStatus: util.toggleMenuStatus,
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
