export interface CalendarItem {
  date: string;
  detail: string;
}

export interface CalendarRecentItem {
  month: number;
  year: number;
  date: number;
  detail: string;
}

export interface CalendarModel {
  getCalendarStatus: 'none' | 'pending' | 'success' | 'failure';
  getCalendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
  calendar: CalendarItem[];
  calendarRecent: CalendarRecentItem[];
}
