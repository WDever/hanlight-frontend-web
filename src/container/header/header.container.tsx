import DesktopHeaderComponent from 'components/header/desktop';
import MobileHeaderComponent from 'components/header/mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, userActions, userReducerActions } from 'store';

export interface HeaderProps {
  name: string;
}

export interface HeaderMethod {
  resetUser(): void;
}

const mapStateToProps = ({ user }: AppState) => ({
  name: user.name,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
});

const HeaderContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(window.innerWidth > 1024 ? DesktopHeaderComponent : MobileHeaderComponent),
);

export default HeaderContainer;
