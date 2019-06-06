import CalendarComponent from 'components/main/calendar';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  calendarActions,
  CalendarRecentItem,
  calendarReducerActions,
} from 'store';

export interface CalendarProps {
  calendarList: CalendarRecentItem[];
  calendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface CalendarMethod {
  calendarRecentApi(params: string | null): void;
}

const CalendarContainer: React.FC<CalendarProps & CalendarMethod> = ({
  calendarRecentApi,
  calendarList,
  calendarRecentStatus,
  accessToken,
}) => (
  <CalendarComponent
    calendarRecentApi={calendarRecentApi}
    calendarList={calendarList}
    calendarRecentStatus={calendarRecentStatus}
    accessToken={accessToken}
  />
);

const mapStateToProps = ({ user, calendar }: AppState) => ({
  calendarList: calendar.calendarRecent,
  calendarRecentStatus: calendar.calendarRecentStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<calendarReducerActions>) => ({
  calendarRecentApi: bindActionCreators(
    calendarActions.calendarRecent,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarContainer);
