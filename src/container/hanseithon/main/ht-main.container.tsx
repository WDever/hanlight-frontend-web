import HTMainComponent from 'components/hanseithon/main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, userReducerActions } from 'store';

export interface HTMainProps {
  errMessage: string;
  accessToken: string;
  userName: string;
  userType: string;
}

export interface HTMainMethod {}

export interface HTMainOwnProps {}

const mapStateToProps = ({ error, user }: AppState) => ({
  errMessage: error.message,
  accessToken: user.accessToken,
  userType: user.type,
  userName: user.name,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({});

const HTMainContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HTMainComponent),
);
export default HTMainContainer;
