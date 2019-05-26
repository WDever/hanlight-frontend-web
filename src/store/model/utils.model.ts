import { CalendarItem, NoticeListItem, MealItem } from '../action';

export interface UtilsModel {
  timetableStatus: 'none' | 'pending' | 'success' | 'failure';
  calendarStatus: 'none' | 'pending' | 'success' | 'failure';
  noticeStatus: 'none' | 'pending' | 'success' | 'failure';
  noticePostStatus: 'none' | 'pending' | 'success' | 'failure';
  mealStatus: 'none' | 'pending' | 'success' | 'failure';
  mealOrderStatus: 'none' | 'pending' | 'success' | 'failure';
  timetable: [
    string[],
    string[],
    string[],
    string[],
    string[],
  ];
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
