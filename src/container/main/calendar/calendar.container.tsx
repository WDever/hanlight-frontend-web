import * as React from 'react';
import CalendarComponent from 'components/main/calendar';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  utilsActions,
  utilsReducerActions,
  CalendarRecentItem,
} from 'store';

export interface CalendarProps {
  calendarList: CalendarRecentItem[];
  calendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface CalendarMethod {
  calendarRecentApi(params: string | null): void;
}

const ScheduleContainer: React.FC<CalendarProps & CalendarMethod> = ({
  calendarRecentApi,
  calendarList,
  calendarRecentStatus,
}) => (
  <CalendarComponent
    calendarRecentApi={calendarRecentApi}
    calendarList={calendarList}
    calendarRecentStatus={calendarRecentStatus}
  />
);

const mapStateToProps = ({ utils }: AppState) => ({
  calendarList: utils.calendarRecent,
  calendarRecentStatus: utils.calendarRecentStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<utilsReducerActions>) => ({
  calendarRecentApi: bindActionCreators(utilsActions.calendarRecent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleContainer);
