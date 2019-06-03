import TimeTableComponent from 'components/main/timeTable';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, timeTableActions, timeTableReducerActions } from 'store';

export interface TimeTableProps {
  timeTableList: [
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[]
  ];
  timetableStatus: 'none' | 'pending' | 'success' | 'failure';
  token: string;
  name: string;
}

export interface TimeTableMethod {
  timetableApi(param: string | null): void;
}

const TimeTableContainer: React.FC<TimeTableProps & TimeTableMethod> = ({
  timeTableList,
  timetableApi,
  timetableStatus,
  token,
  name,
}) => (
  <TimeTableComponent
    timeTableList={timeTableList}
    timetableApi={timetableApi}
    timetableStatus={timetableStatus}
    token={token}
    name={name}
  />
);

const mapStateToProps = ({ user, timeTable }: AppState) => ({
  timeTableList: timeTable.timetable,
  timetableStatus: timeTable.timetableStatus,
  token: user.token,
  name: user.data.name,
});

const mapDispatchToProps = (dispatch: Dispatch<timeTableReducerActions>) => ({
  timetableApi: bindActionCreators(timeTableActions.timeTable, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeTableContainer);
