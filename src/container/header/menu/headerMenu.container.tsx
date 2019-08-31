import HeaderMenuComponent from 'components/header/menu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  userReducerActions,
  utilActions,
  utilReducerActions,
} from 'store';

export interface HeaderMenuProps {
  name: string;
  image: string | null;
  type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
}

export interface HeaderMenuMethod {
  toggleMenu(data: boolean): void;
}

export interface HeaderMenuOwnProps {
  logout(): void;
}

const mapStateToProps = ({ user }: AppState, ownProps: HeaderMenuOwnProps) => ({
  name: user.name,
  image: user.image,
  type: user.type,
  ...ownProps,
});

const mapDispatchToProps = (
  dispatch: Dispatch<userReducerActions | utilReducerActions>, // 땜빵
) => ({
  toggleMenu: bindActionCreators(utilActions.toggleMenu, dispatch),
});

const HeaderMenuContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HeaderMenuComponent),
);

export default HeaderMenuContainer;
