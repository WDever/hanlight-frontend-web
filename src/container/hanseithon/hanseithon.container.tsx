import HanseithonComponent from 'components/hanseithon';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from 'store';

export interface HanseiThonProps {
  deemStatus: boolean;
  agreeStatus: boolean;
}

export interface HanseiThonMethod {}

export interface OwnProps {}

const mapStateToProps = ({ hanseithon }: AppState) => ({
  deemStatus: hanseithon.deemStatus,
  agreeStatus: hanseithon.agreeStatus,
});

const mapDispatchToProps = ({}) => ({});

const HanseithonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HanseithonComponent);

export default HanseithonContainer;
