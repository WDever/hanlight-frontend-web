import { produce } from 'immer';
import { CalendarModel, calendarReducerActions } from 'store';

const initialState: CalendarModel = {
  calendarStatus: 'none',
  calendarRecentStatus: 'none',
  calendar: [],
  calendarRecent: [],
};

export const calendarReducer = (
  state: CalendarModel = initialState,
  action: calendarReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
    case 'CALENDAR':
      draft.calendarStatus = 'pending';
      break;

    case 'CALENDAR_SUCCESS':
      draft.calendarStatus = 'success';
      draft.calendar = action.payload.data.calendar;
      break;

    case 'CALENDAR_FAILURE':
      draft.calendarRecentStatus = 'failure';
      break;

    case 'CALENDAR_RECENT':
      draft.calendarRecentStatus = 'pending';
      break;

    case 'CALENDAR_RECENT_SUCCESS':
      draft.calendarRecentStatus = 'success';
      draft.calendarRecent = action.payload.data.calendar;
      break;

    case 'CALENDAR_RECENT_FAILURE':
      draft.calendarRecentStatus = 'failure';
      break;

    default:
      break;
  }
});
