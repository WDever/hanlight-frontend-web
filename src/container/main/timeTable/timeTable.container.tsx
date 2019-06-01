import * as React from 'react';
import TimeTableComponent from 'components/main/timeTable';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, timeTableActions, timeTableReducerActions } from 'store';

export interface TimeTableProps {
  timeTableList: [string[], string[], string[], string[], string[]];
  timetableStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface TimeTableMethod {
  timetableApi(param: string | null): void;
}

const TimeTableContainer: React.FC<TimeTableProps & TimeTableMethod> = ({
  timeTableList,
  timetableApi,
  timetableStatus,
}) => (
  <TimeTableComponent
    timeTableList={timeTableList}
    timetableApi={timetableApi}
    timetableStatus={timetableStatus}
  />
);

const mapStateToProps = ({ timeTable }: AppState) => ({
  timeTableList: timeTable.timetable,
  timetableStatus: timeTable.timetableStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<timeTableReducerActions>) => ({
  timetableApi: bindActionCreators(timeTableActions.timeTable, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeTableContainer);
