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
  getCalendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface CalendarMethod {
  getCalendarRecent(params: string | null): void;
}

const CalendarContainer: React.FC<CalendarProps & CalendarMethod> = ({
  getCalendarRecent,
  calendarList,
  getCalendarRecentStatus,
  accessToken,
}) => (
  <CalendarComponent
    getCalendarRecent={getCalendarRecent}
    calendarList={calendarList}
    getCalendarRecentStatus={getCalendarRecentStatus}
    accessToken={accessToken}
  />
);

const mapStateToProps = ({ user, calendar }: AppState) => ({
  calendarList: calendar.calendarRecent,
  getCalendarRecentStatus: calendar.getCalendarRecentStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<calendarReducerActions>) => ({
  getCalendarRecent: bindActionCreators(
    calendarActions.getCalendarRecent,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarContainer);
