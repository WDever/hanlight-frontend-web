import DetailCalendarComponent from 'components/calendar/detail-calendar';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  calendarActions,
  CalendarItem,
  calendarReducerActions,
  GetCalendarParams,
} from 'store';

export interface DetailCalendarProps {
  getCalendarStatus: 'none' | 'pending' | 'success' | 'failure';
  calendar: CalendarItem[];
  accessToken: string;
}

export interface DetailCalendarMethod {
  getCalendar(params: GetCalendarParams): void;
}

const mapStateToProps = ({ calendar, user }: AppState) => ({
  calendar: calendar.calendar,
  getCalendarStatus: calendar.getCalendarStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<calendarReducerActions>) => ({
  getCalendar: bindActionCreators(calendarActions.getCalendar, dispatch),
});

const DetailCalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailCalendarComponent);

export default DetailCalendarContainer;
