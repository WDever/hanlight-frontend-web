import HeaderComponent from 'components/header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  hanlightMusicActions,
  hanlightMusicReducerActions,
  userActions,
  userReducerActions,
  utilActions,
  utilReducerActions,
} from 'store';

export interface HeaderProps {
  name: string;
}

export interface HeaderMethod {
  resetUser(): void;
  toggleMenu(payload: boolean): void;
}

const mapStateToProps = ({ user }: AppState) => ({
  name: user.name,
});

const mapDispatchToProps = (
  dispatch: Dispatch<
    userReducerActions | utilReducerActions | hanlightMusicReducerActions
  >,
) => ({
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
  toggleMenu: bindActionCreators(utilActions.toggleMenu, dispatch),
});

const HeaderContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HeaderComponent),
);

export default HeaderContainer;
