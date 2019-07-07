import { produce } from 'immer';
import { CalendarModel, calendarReducerActions } from 'store';

const initialState: CalendarModel = {
  getCalendarStatus: 'none',
  getCalendarRecentStatus: 'none',
  calendar: [],
  calendarRecent: [],
};

export const calendarReducer = (
  state: CalendarModel = initialState,
  action: calendarReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_CALENDAR':
        draft.getCalendarStatus = 'pending';
        break;

      case 'GET_CALENDAR_SUCCESS':
        draft.getCalendarStatus = 'success';
        draft.calendar = action.payload.data.calendar;
        break;

      case 'GET_CALENDAR_FAILURE':
        draft.getCalendarStatus = 'failure';
        break;

      case 'GET_CALENDAR_RECENT':
        draft.getCalendarRecentStatus = 'pending';
        break;

      case 'GET_CALENDAR_RECENT_SUCCESS':
        draft.getCalendarRecentStatus = 'success';
        draft.calendarRecent = action.payload.data.calendar;
        break;

      case 'GET_CALENDAR_RECENT_FAILURE':
        draft.getCalendarRecentStatus = 'failure';
        break;

      default:
        break;
    }
  });
