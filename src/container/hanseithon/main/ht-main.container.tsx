import HTMainComponent from 'components/hanseithon/main';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, hanseithonActions, hanseithonReducerActions, userReducerActions } from 'store';

export interface HTMainProps {
  deemStatus: boolean;
}

export interface HTMainMethod {
  deem(payload: boolean): void;
}

export interface HTMainOwnProps {}

const mapStateToProps = ({ hanseithon }: AppState) => ({
  deemStatus: hanseithon.deemStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<hanseithonReducerActions | userReducerActions>) => ({
  deem: bindActionCreators(
    hanseithonActions.deem,
    dispatch,
  ),
});

const HTMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTMainComponent);

export default HTMainContainer;
