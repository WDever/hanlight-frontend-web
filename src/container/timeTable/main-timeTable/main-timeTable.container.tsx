import TimeTableComponent from 'components/timeTable/main-timeTable';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, timeTableActions, timeTableReducerActions } from 'store';

export interface MainTimeTableProps {
  timeTableList: [
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[]
  ];
  getTimetableStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
  name: string;
}

export interface MainTimeTableMethod {
  getTimetableApi(param: string | null): void;
}

const MainTimeTableContainer: React.FC<MainTimeTableProps & MainTimeTableMethod> = ({
  timeTableList,
  getTimetableStatus,
  getTimetableApi,
  accessToken,
  name,
}) => (
  <TimeTableComponent
    timeTableList={timeTableList}
    getTimetableStatus={getTimetableStatus}
    getTimetableApi={getTimetableApi}
    accessToken={accessToken}
    name={name}
  />
);

const mapStateToProps = ({ user, timeTable }: AppState) => ({
  timeTableList: timeTable.timetable,
  getTimetableStatus: timeTable.getTimetableStatus,
  accessToken: user.accessToken,
  name: user.data.name,
});

const mapDispatchToProps = (dispatch: Dispatch<timeTableReducerActions>) => ({
  getTimetableApi: bindActionCreators(timeTableActions.getTimeTable, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTimeTableContainer);
