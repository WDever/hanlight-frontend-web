import { produce } from 'immer';
import { TimeTableModel, timeTableReducerActions } from 'store';

const initialState: TimeTableModel = {
  getTimetableStatus: 'none',
  timetable: [[], [], [], [], [], [], []],
};

export const timeTableReducer = (
  state: TimeTableModel = initialState,
  action: timeTableReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_TIMETABLE':
        draft.getTimetableStatus = 'pending';
        break;

      case 'GET_TIMETABLE_SUCCESS':
        draft.getTimetableStatus = 'success';
        draft.timetable[1] = action.payload.data.timetable.월;
        draft.timetable[2] = action.payload.data.timetable.화;
        draft.timetable[3] = action.payload.data.timetable.수;
        draft.timetable[4] = action.payload.data.timetable.목;
        draft.timetable[5] = action.payload.data.timetable.금;
        break;

      case 'GET_TIMETABLE_FAILURE':
        draft.getTimetableStatus = 'failure';
        break;

      default:
        break;
    }
  });
