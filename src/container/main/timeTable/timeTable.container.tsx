import * as React from 'react';
import TimeTableComponent from 'components/main/timeTable';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, utilsActions, utilsReducerActions } from 'store';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface TimeTableProps {
  timeTableList: [
    string[],
    string[],
    string[],
    string[],
    string[],
  ];
  timetableStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface TimeTableMethod {
  timetableApi(param: string | null): void;
}

const TimeTableContainer: React.FC<TimeTableProps & TimeTableMethod & RouteComponentProps> = ({
  timeTableList, timetableApi, timetableStatus, history, location, match,
}) => {
  return (
    <TimeTableComponent
      timeTableList={timeTableList}
      timetableApi={timetableApi}
      timetableStatus={timetableStatus}
      history={history}
      location={location}
      match={match}
    />
  );
};

const mapStateToProps = ({ utils }: AppState) => ({
  timeTableList: utils.timetable,
  timetableStatus: utils.timetableStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<utilsReducerActions>) => ({
  timetableApi: bindActionCreators(utilsActions.timetable, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TimeTableContainer),
);
