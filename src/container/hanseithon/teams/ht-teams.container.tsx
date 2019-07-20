import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import HTTeamsComponents from 'components/hanseithon/teams';

export interface HTTeamsProps {}

export interface HTTeamsMethod {}

export interface HTTeamsOwnProps {}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = () => ({});

const HTTeamsContainer = connect(mapStateToProps, mapDispatchToProps)(HTTeamsComponents);

export default HTTeamsContainer;
