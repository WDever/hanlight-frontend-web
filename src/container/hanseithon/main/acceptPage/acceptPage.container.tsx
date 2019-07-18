import AcceptPageComponent from 'components/hanseithon/main/acceptPage';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { hanseithonActions, hanseithonReducerActions, userReducerActions } from 'store';

export interface AcceptPageProps {}
export interface AcceptPageMethod {
  deem(payload: boolean): void;
}
export interface AcceptPageOwnProps {}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Dispatch<hanseithonReducerActions | userReducerActions>) => ({
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
});

const AcceptPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AcceptPageComponent);

export default AcceptPageContainer;
