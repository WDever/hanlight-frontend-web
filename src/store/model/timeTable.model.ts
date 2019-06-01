export interface TimeTableModel {
  timetableStatus: 'none' | 'pending' | 'success' | 'failure';
  timetable: [string[], string[], string[], string[], string[]];
}
