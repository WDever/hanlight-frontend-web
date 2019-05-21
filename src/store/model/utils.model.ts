import { CalendarItem, NoticeListItem, MealItem } from '../action';

export interface UtilsModel {
  timetableStatus: 'none' | 'pending' | 'success' | 'failure';
  calendarStatus: 'none' | 'pending' | 'success' | 'failure';
  noticeStatus: 'none' | 'pending' | 'success' | 'failure';
  noticePostStatus: 'none' | 'pending' | 'success' | 'failure';
  mealStatus: 'none' | 'pending' | 'success' | 'failure';
  mealOrderStatus: 'none' | 'pending' | 'success' | 'failure';
  timetable: {
    월: string[];
    화: string[];
    수: string[];
    목: string[];
    금: string[];
  };
  calendar: CalendarItem[];
  noticeList: NoticeListItem[];
  noticePost: {
    pk: number;
    title: string;
    content: string;
    updateAt: string;
  };
  mealList: MealItem[];
  mealOrder: string;
}
