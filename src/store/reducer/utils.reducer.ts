import { produce } from 'immer';
import { utilsReducerActions } from '../action';
import { UtilsModel } from '../model/utils.model';

const initialState: UtilsModel = {
  timetableStatus: 'none',
  calendarStatus: 'none',
  noticeStatus: 'none',
  noticePostStatus: 'none',
  mealStatus: 'none',
  mealOrderStatus: 'none',
  timetable: {
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
  },
  calendar: [],
  noticeList: [],
  noticePost: {
    pk: 0,
    title: '',
    content: '',
    updateAt: '',
  },
  mealList: [],
  mealOrder: '',
};

export const utilsReducer = (
  state: UtilsModel = initialState,
  action: utilsReducerActions,
) => produce(state, (draft) => {
  switch (action.type) {
    case 'TIMETABLE':
      draft.timetableStatus = 'pending';
      break;

    case 'TIMETABLE_SUCCESS':
      draft.timetableStatus = 'success';
      draft.timetable.월 = action.payload.data.timetable.월;
      draft.timetable.화 = action.payload.data.timetable.화;
      draft.timetable.수 = action.payload.data.timetable.수;
      draft.timetable.목 = action.payload.data.timetable.목;
      draft.timetable.금 = action.payload.data.timetable.금;
      break;

    case 'TIMETABLE_FAILURE':
      draft.timetableStatus = 'failure';
      break;

    case 'CALENDAR':
      draft.calendarStatus = 'pending';
      break;

    case 'CALENDAR_SUCCESS':
      draft.calendarStatus = 'success';
      draft.calendar = action.payload.data.calendar;
      break;

    case 'CALENDAR_FAILURE':
      draft.calendarStatus = 'failure';
      break;

    case 'NOTICE':
      draft.noticeStatus = 'pending';
      break;

    case 'NOTICE_SUCCESS':
      draft.noticeStatus = 'success';
      draft.noticeList = action.payload.data.notice;
      break;

    case 'NOTICE_FAILURE':
      draft.noticeStatus = 'failure';
      break;

    case 'NOTICE_POST':
      draft.noticePostStatus = 'pending';
      break;

    case 'NOTICE_POST_SUCCESS':
      draft.noticePostStatus = 'success';
      draft.noticePost = action.payload.data;
      break;

    case 'NOTICE_POST_FAILURE':
      draft.noticePostStatus = 'failure';
      break;

    case 'MEAL':
      draft.mealStatus = 'pending';
      break;

    case 'MEAL_SUCCESS':
      draft.mealStatus = 'success';
      draft.mealList = action.payload.data.meal;
      break;

    case 'MEAL_FAILURE':
      draft.mealStatus = 'failure';
      break;

    case 'MEAL_ORDER':
      draft.mealOrderStatus = 'pending';
      break;

    case 'MEAL_ORDER_SUCCESS':
      draft.mealOrderStatus = 'success';
      draft.mealOrder = action.payload.data.order;
      break;

    case 'MEAL_ORDER_FAILURE':
      draft.mealOrderStatus = 'failure';
      break;

    default:
      break;
  }
});
