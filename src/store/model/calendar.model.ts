export interface CalendarItem {
  date: string;
  detail: string;
}

export interface CalendarRecentItem {
  month: string;
  year: string;
  date: string;
  detail: string;
}

export interface CalendarModel {
  getCalendarStatus: 'none' | 'pending' | 'success' | 'failure';
  getCalendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
  calendar: CalendarItem[];
  calendarRecent: CalendarRecentItem[];
}
