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
  calendarStatus: 'none' | 'pending' | 'success' | 'failure';
  calendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
  calendar: CalendarItem[];
  calendarRecent: CalendarRecentItem[];
}
